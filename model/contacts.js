const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const dataListContacts = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(dataListContacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find(({ id }) => id.toString() === contactId);
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = uuid();
  const newContact = { id, ...body };
  const newContacts = [...contacts, newContact];
  await fs.write(contactsPath, "utf-8", JSON.stringify(newContacts, null, 2));
  return newContact;
};
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id.toString() === contactId);
  if (!contact) return;
  const newContacts = contacts.filter(({ id }) => id.toString() !== contactId);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    "utf8"
  );
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id.toString() === contactId);
  if (index === -1) return;
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, "utf-8", JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
