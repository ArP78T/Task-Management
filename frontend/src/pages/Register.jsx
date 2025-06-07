import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";
function Register() {
    const navigate = useNavigate();
    let [data, setData] = useState({
        username: "",
        email: "",
        password:"",
    })
    let handle = (e) => {
        let { value, name } = e.target
        setData({...data,[name]:value})
    }
    let registerHandle = async (e) => {
        try {
            e.preventDefault();
            let response = await axios.post("https://task-management-1r57.onrender.com/api/register", data)
            alert(response.data.success)
            navigate('/login')
        } catch (error) {
            alert(error.response.data.error)
        }
    }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">Taskify</h1>
        <h3 className="text-center font-semibold text-zinc-900">Register the User</h3>
      </div>

      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Username"
                      name="username"
                      value={data.username}
                      onChange={handle}
            className="border rounded px-4 py-1 border-zinc-400 w-full outline-none mt-2"
          />
          <input
            type="email"
            required
            placeholder="Email"
                      name="email"
                      value={data.email}
                        onChange={handle}
            className="border rounded px-4 py-1 border-zinc-400 w-full outline-none mt-2"
          />
          <input
            type="password"
            required
            placeholder="Password"
                      name="password"
                      value={data.password}
                        onChange={handle}
            className="border rounded px-4 py-1 border-zinc-400 w-full outline-none mt-2"
          />
          <button
            type="submit"
            className="bg-blue-800 text-white font-semibold w-full px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 mt-2"onClick={registerHandle}
          >
            Register
          </button>
          <p className="text-center font-semibold text-gray-900">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
