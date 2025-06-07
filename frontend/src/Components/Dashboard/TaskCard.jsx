import axios from "axios";
function TaskCard({ task, setFlag,flag}) {
  let deleteHandle = async (id) => {
    try {
    let token=localStorage.getItem("token")
  let res = await axios.delete(`https://task-management-1r57.onrender.com/api/deleteTask/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
      console.log("Deleted:", res.data);
      setFlag(flag+1)
} catch (error) {
  console.error("Error in delete:", error.response?.data || error.message);
}

}

  return (
    <div className="bg-white rounded px-4 w-full py-2 hover:shadow transition-all duration-300 text-left">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">{task.title}</h1>
        <div
          className={`text-sm px-2 py-1 rounded-full ${
            task.priority === "low"
              ? "text-green-500 bg-green-100"
              : task.priority === "medium"
              ? "text-yellow-600 bg-yellow-100"
              : "text-red-500 bg-red-100"
          }`}
        >
          {task.priority}
        </div>
      </div>

      <hr className="my-2" />

      <p className="text-sm text-zinc-500 text-start">{task.description}</p>

      {/* ✏️ Delete Button */}
      <div className="text-right mt-2">
        <button
         onClick={()=>deleteHandle(task._id)}
          className="text-blue-600 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
