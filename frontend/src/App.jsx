
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function App() {
  let navigate=useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
          navigate('/dashboard')
        }  
        else {
            navigate('/login')
        }
    },[])
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App