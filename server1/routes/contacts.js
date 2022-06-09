const express = require("express");
const {
  getContacts,
  createContacts,
  updateContacts,
  deleteContact,
} = require("../controllers/contactsController");
const router = express.Router();

router
  .route("/contact/:id?")
  .get(getContacts)
  .post(createContacts)
  .put(updateContacts)
  .delete(deleteContact);

module.exports = router;
