const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");

const {
  validateSchemaCreateContact,
  validateSchemaUpdateContact,
  validateSchemaUpdateStatusContact,
} = require("../../validation/contacts");

const guard = require("../../helpers/guard");

router.get("/", guard, contactsController.listContacts);

router.get("/:contactId", guard, contactsController.getContactById);

router.post(
  "/",
  guard,
  validateSchemaCreateContact,
  contactsController.addContact
);
router.put(
  "/:contactId",
  guard,
  validateSchemaUpdateContact,
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  validateSchemaUpdateStatusContact,
  contactsController.updateContactStatus
);

router.delete("/:contactId", guard, contactsController.removeContact);

module.exports = router;
