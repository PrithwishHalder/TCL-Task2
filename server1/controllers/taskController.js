const Task = require("../models/taskModel");

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
    const data = await Task.create({ task });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const data = await (req.params.id ? Task.findById(req.params.id) : Task.find());
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
    // GET THE RECORD
    const data = await Task.findOne({ _id: id });
    if (data === null) {
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

    const updatedData = await Task.findByIdAndUpdate(id, { status });
    res.json({ message: "Task Updated!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id });

    if (!task) {
      return res.status(404).json({
        message: "No such Task found!",
      });
    }

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
