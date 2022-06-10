const express = require("express");
const { getTask, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();

router.get("/task", getTask); // GET Task URL
router.post("/task", createTask); // POST Task URL
router.put("/task", updateTask); // PUT Task URL
router.delete("/task", deleteTask); // DELETE Task URL

module.exports = router;
