const User = require("../schemas/user");

class UsersRepository {
  constructor() {
    this.model = User;
  }
  async findEmail(email) {
    const results = await this.model.find({ email });
    return results;
  }

  async findById(id) {
    const result = await this.modal.findOne({ _id: id });
  }

  async create({ name, email, password, subscription }) {
    const user = new this.model({ name, email, password, subscription });
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }
}

module.exports = UsersRepository;
