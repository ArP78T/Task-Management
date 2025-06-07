import TaskCard from "./TaskCard"

function Completed({tasks,setFlag, flag }) {
   return (
    <div className="flex flex-col gap-2">
      {
        tasks.map(task => <TaskCard  flag={flag} setFlag={setFlag} key={task._id} task={task}/>)
      }

      </div>
      
  )
}

export default Completed