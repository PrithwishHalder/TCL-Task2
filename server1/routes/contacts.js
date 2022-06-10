const express = require("express");
const {
  getContacts,
  createContacts,
  updateContacts,
  deleteContact,
} = require("../controllers/contactsController");
const router = express.Router();

router.get("/contact", getContacts); // GET Contact URL
router.post("/contact", createContacts); // POST Contact URL
router.put("/contact", updateContacts); // PUT Contact URL
router.delete("/contact", deleteContact); // DELETE Contact URL

module.exports = router;
