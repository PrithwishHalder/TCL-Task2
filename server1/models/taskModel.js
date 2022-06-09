const mongoose = require("mongoose");

const task = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      uppercase: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", task);
