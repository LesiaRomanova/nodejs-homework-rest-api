const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");
const {
  validateSchemaCreateContact,
  validateSchemaUpdateContact,
  validateSchemaUpdateStatusContact,
} = require("../../validation/contacts");

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", validateSchemaCreateContact, contactsController.addContact);
router.put(
  "/:contactId",
  validateSchemaUpdateContact,
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateSchemaUpdateStatusContact,
  contactsController.updateContactStatus
);

router.delete("/:contactId", contactsController.removeContact);

module.exports = router;
