const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", contactsSchema);
