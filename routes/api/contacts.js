const express = require("express");
const router = express.Router();
const Contacts = require("../../model/contacts");
const {
  validateSchemaCreateContact,
  validateSchemaUpdateContact,
} = require("../../validation/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "Success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contacts found",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found contact",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validateSchemaCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);

    return res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact success created",
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: "Success",
        code: 200,
        message: "Contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: " Not found contact ",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId",
  validateSchemaUpdateContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        return res.json({
          status: "Success",
          code: 200,
          message: "Contact has been update",
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: "Error",
          code: 404,
          message: "Not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
