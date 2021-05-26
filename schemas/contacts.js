const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name contact is required"],
    },
    email: {
      type: String,
      required: [true, "Email contact is required"],
    },
    phone: {
      type: String,
    },

    favorite: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },

    owner: {
      name: String,
      phone: String,
      address: String,
    },
  },

  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
