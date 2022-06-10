const express = require("express");
const {
  getContacts,
  createContacts,
  updateContacts,
  deleteContact,
} = require("../controllers/contactsController");
const router = express.Router();

router.get("/contact/:id?", getContacts); // GET Contact URL
router.post("/contact/", createContacts); // POST Contact URL
router.put("/contact/:id", updateContacts); // PUT Contact URL
router.delete("/contact/:id", deleteContact); // DELETE Contact URL

module.exports = router;
