const express = require("express");
const { getTask, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();

router.route("/task/:id?").get(getTask).post(createTask).put(updateTask).delete(deleteTask);

module.exports = router;
