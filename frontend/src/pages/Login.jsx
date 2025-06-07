import { Link ,useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
function Login() {
  let navigate=useNavigate()
       let [data, setData] = useState({
        email: "",
        password:"",
    })
    let handle = (e) => {
        let { value, name } = e.target
        setData({...data,[name]:value})
    }
    let LoginHandle = async (e) => {
        try {
            e.preventDefault();
            let response = await axios.post("http://localhost:8000/api/login", data)
          localStorage.setItem("token", response.data.token);
          navigate('/dashboard')
        } catch (error) {
            alert(error.response.data.error)
        }
    }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">Taskify</h1>
        <h3 className="text-center font-semibold text-zinc-900">Log In the User</h3>
      </div>

      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
        <form className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="border rounded px-4 py-1 border-zinc-400 w-full outline-none mt-2"
                      name="email"
                      value={data.email}
                      onChange={handle}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="border rounded px-4 py-1 border-zinc-400 w-full outline-none mt-2"
                      name="password"
                      value={data.password}
                      onChange={handle}
          />
          <button
            type="submit"
            className="bg-blue-800 text-white font-semibold w-full px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 mt-2"
           onClick={LoginHandle}>
            Login
          </button>
          <p className="text-center font-semibold text-gray-900">
            Don't have an account? <Link to="/register" className="text-blue-700 underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
