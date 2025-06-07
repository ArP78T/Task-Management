const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true, 
    unique: true,    
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: true
  },
  status: {
    type: String,
    enum: ["yetToStart", "inprogress", "completed"],
    default: "yetToStart",
    required: true
  }
});

module.exports = mongoose.model("Task", TaskSchema);
