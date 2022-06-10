const Contacts = require("../models/contactsModel");

// Controller to create new records
const createContacts = async (req, res) => {
  try {
    const { name, phone } = req.body;
    // NULL VALIDATION
    if (!name || !phone) {
      return res.status(404).json({
        message: `Please enter${!name && " Name,"}${!phone && " Phone"} fields!`,
      });
    }
    // CHECK DUPLICATE RECORD IF EXISTS
    const phoneExists = await Contacts.findOne({ phone });
    if (phoneExists) {
      return res.status(409).json({
        message: "Record already exists with the given phone no!",
      });
    }
    // CREATE RECORD IF NEW RECORD
    const newContact = await Contacts.create({ name, phone });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to get records from DB
const getContacts = async (req, res) => {
  try {
    // GET ONE RECORD IF 'id' PASSED, ELSE GET ALL RECORDS
    const contact = await (req.params.id ? Contacts.findById(req.params.id) : Contacts.find());
    if (contact === null || contact.length === 0) {
      return res.status(404).json({
        message: "No Records found!",
      });
    }
    res.json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to update already available records
const updateContacts = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone } = req.body;
    if (!id) {
      return res.status(404).json({
        message: `Please enter${!id && " id"} parameter!`,
      });
    }
    // CHECK IF THE RECORD EXISTS
    const data = await Contacts.findOne({ _id: id });
    if (data === null) {
      return res.status(404).json({
        message: "No Records found!",
      });
    }

    // NULL VALIDATION
    if (!name || !phone) {
      return res.status(404).json({
        message: `Please enter${!name && " Name,"}${!phone && " Phone"} fields!`,
      });
    }
    // UPDATE THE RECORD
    const updatedData = await Contacts.findByIdAndUpdate(id, { name, phone });
    res.json({ message: "Contact Updated!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to delete records from DB
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: `Please enter valid${!id && " id"} parameter!`,
      });
    }
    // FIND IF THE RECORDS EXISTS
    const contact = await Contacts.findById({ _id: id });
    if (!contact) {
      return res.status(404).json({
        message: "No such Contact found!",
      });
    }

    // DELETE THE CONTACT BASED IN 'id'
    const deletedContact = await Contacts.findByIdAndRemove(id);
    return res.json({ message: "Contact Deleted!" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  createContacts,
  updateContacts,
  deleteContact,
};
