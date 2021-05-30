const Contact = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }
  async listContacts() {
    const results = await this.model.find({ owner: userId }).populate({
      path: "owner",
      select: "name email subscription -_id",
    });
    return results;
  }

  async getContactById(contactId, userId) {
    try {
      const result = await (
        await this.model.findOne({ _id: contactId, owner: userId })
      ).populated({
        path: "owner",
        select: "name email subscription -_id",
      });
      return result;
    } catch (e) {
      e.status = 400;
      e.data = "Bad Request";
      throw e;
    }
  }

  async addContact(body) {
    const result = await this.model.addContact(body);
    return result;
  }

  async updateContact(contactId, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    );
    return result;
  }

  async removeContact(contactId, userId) {
    const result = await this.model.findByIdAndRemove({
      _id: contactId,
      owner: userId,
    });
    return result;
  }
}

module.exports = ContactsRepository;
