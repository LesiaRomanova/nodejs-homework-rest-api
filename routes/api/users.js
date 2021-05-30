const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users");

const guard = require("../../helpers/guard");

router.post("/registration", guard, usersController.reg);
router.post("/login", guard, usersController.login);
router.post("/logout", guard, usersController.logout);

module.exports = router;
