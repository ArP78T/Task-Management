import { useState, useEffect } from "react";
import axios from "axios";

import AddTask from "../Components/Dashboard/AddTask";
import Header from "../Components/Dashboard/Header";
import StackTitle from "../Components/Dashboard/StackTitle";
import YetToStart from "../Components/Dashboard/YetToStart";
import Inprogress from "../Components/Dashboard/Inprogress";
import Completed from "../Components/Dashboard/Completed";
import EditTask from "../Components/Dashboard/EditTask";

function Dashboard() {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
  const [EditId, setEditId] = useState(null);
  let[flag,setFlag]=useState(0)

  const [Tasks, setTasks] = useState({
    yetToStart: [],
    inProgress: [],
    completed: [],
  });

  // Fetch tasks on modal toggle
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/userDetail", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Error fetching user details:", error.response?.data || error.message);
      }
    };

    fetchUserDetails();
  }, [flag]);

  // Check if edit task is stored
  useEffect(() => {
    const editTask = localStorage.getItem("editTask");
    if (editTask) {
      const parsedTask = JSON.parse(editTask);
      setEditTaskDiv("block");
      setEditId(parsedTask._id);
    }
  }, []);

  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[80vh] max-h-auto">
        <div className="w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">
            <YetToStart flag={flag} setFlag={setFlag} tasks={Tasks.yetToStart} />
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">
            <Inprogress  flag={flag} setFlag={setFlag} tasks={Tasks.inProgress} />
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"Completed"} />
          <div className="pt-2">
            <Completed  flag={flag} setFlag={setFlag} tasks={Tasks.completed} />
          </div> 
        </div>
      </div>

      {/* Add Task Modal */}
      <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}>
        <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
          <AddTask setAddTaskDiv={setAddTaskDiv} setflag={setFlag} flag={flag} />
        </div>
      </div>

      {/* Edit Task Modal */}
      <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}>
        <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
          <EditTask setflag={setFlag} flag={flag}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
