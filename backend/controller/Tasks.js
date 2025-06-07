const Task = require("../model/Tasks");

const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
      const { user } = req;
     console.log(user)
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTask = await Task.create({ title, description, priority, status });
    user.tasks.push(newTask._id);
    await user.save();

    return res.status(200).json({ success: "Task is added" });
  } catch (error) {
    console.error("Add Task Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


let editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ success: "Task is updated", updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

let singleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

let deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ success: "Task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTask, singleTask, deleteTask, editTask };
