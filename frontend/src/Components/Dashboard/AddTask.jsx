import { useState } from "react";
import axios from "axios";
function AddTask({ setAddTaskDiv,setflag,flag }) {
  const [formData, setFormData] = useState({
    title: "",
    priority: "low",
    status: "yetToStart",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({ ...formData, [name]:value});
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
  try {
      const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:8000/api/addTask", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      console.log(response.data)

    if (response.data) {
      alert("Task is Added");
  
      setFormData({
        title: "",
        priority: "low",
        status: "yetToStart",
        description: "",
      });
      setAddTaskDiv("hidden");
      setflag(flag+1)
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || "Something went wrong");
  }
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl">Add Task</h1>
      <hr className="mb-4 mt-2" />
      <form  className="flex flex-col gap-4">
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <div className="flex items-center justify-between gap-4">
          <button
                      className="w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
                      onClick={handleSubmit}
          >
            Add Task
          </button>
          <button
            type="button"
            className="w-full border py-2 hover:bg-zinc-100 transition-all duration-300 text-black rounded"
            onClick={() => {
              setFormData({
                title: "",
                priority: "low",
                status: "yetToStart",
                description: "",
              });
              setAddTaskDiv("hidden"); // assuming this sets visibility
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
