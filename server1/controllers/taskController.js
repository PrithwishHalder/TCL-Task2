const Task = require("../models/taskModel");

// Controller to create new Record
const createTask = async (req, res) => {
  try {
    const { task } = req.body;
    // NULL VALIDATION
    if (!task) {
      return res.status(404).json({
        message: `Please enter Task fields!`,
      });
    }
    // CHECK DUPLICATE RECORD IF EXISTS
    const taskExists = await Task.findOne({ task });
    if (taskExists) {
      return res.status(409).json({
        message: "Record already exists with the given task details!",
      });
    }
    // CREATE RECORD IF NEW RECORD
    const newTask = await Task.create({ task });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to get records from DB
const getTask = async (req, res) => {
  try {
    const tasks = await (req.params.id ? Task.findById(req.params.id) : Task.find());
    if (tasks === null || tasks.length === 0) {
      return res.status(404).json({
        message: "No Records found!",
      });
    }
    res.json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to update record available in DB
const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    console.log(id);
    if (!id) {
      return res.status(404).json({
        message: `Please enter${!id && " id"} parameter!`,
      });
    }
    // CHECK IF THE RECORD EXISTS
    const taskExists = await Task.findOne({ _id: id });
    if (taskExists === null) {
      return res.status(404).json({
        message: "No Records found!",
      });
    }
    // EMPTY STATUS VALIDATION
    if (status === undefined) {
      return res.status(404).json({
        message: `Please enter valid Status fields!`,
      });
    }
    // UPDATE THE RECORD
    const updatedData = await Task.findByIdAndUpdate(id, { status });
    res.json({ message: "Task Updated!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to delete records from DB
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: `Please enter valid${!id && " id"} parameter!`,
      });
    }
    // FIND IF THE RECORDS EXISTS
    const task = await Task.findById({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({
        message: "No such Task found!",
      });
    }
    // DELETE THE CONTACT BASED IN 'id'
    const deletedtask = await Task.findByIdAndRemove(req.params.id);
    return res.json({ message: "Task Deleted!" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
