const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(409).json({
        status: "Error",
        code: 409,
        data: "Conflict",
        message: "User with this email is already exist",
      });
    }

    const newUser = await Users.create(req.body);
    return res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(401).json({
        status: "Error",
        code: 401,
        data: "Unauthorized",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);

    return res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, _next) => {
  const userId = req.user.id;
  await Users.updateToken(userId, null);
  return res.status(204).json();
};

module.exports = {
  reg,
  login,
  logout,
};
