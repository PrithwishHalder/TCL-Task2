const Contacts = require("../models/contactsModel");

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
    const data = await Contacts.create({ name, phone });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const data = await (req.params.id ? Contacts.findById(req.params.id) : Contacts.find());
    if (data.length === 0 || data === null) {
      return res.status(404).json({
        message: "No Records found!",
      });
    }
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateContacts = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone } = req.body;
    console.log(id);
    if (!id) {
      return res.status(404).json({
        message: `Please enter${!id && " id"} parameter!`,
      });
    }
    // GET THE RECORD
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

    const updatedData = await Contacts.findByIdAndUpdate(id, { name, phone });
    res.json({ message: "Contact Updated!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contacts.findById({ _id: req.params.id });

    if (!contact) {
      return res.status(404).json({
        message: "No such Contact found!",
      });
    }

    const deletedContact = await Contacts.findByIdAndRemove(req.params.id);
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
