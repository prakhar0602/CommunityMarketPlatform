import { Route, Routes } from "react-router-dom"
import Auth from "./Pages/Auth"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/userSlice";
import { useEffect } from "react";
import Profile from "./Pages/Profile";
import Browse from "./Pages/Browse";
import View from "./Pages/View";
import Dashboard from "./Pages/Dashboard";
import OtherProfile from "./Pages/OtherProfile";
import Messaging from "./Pages/Messaging";
const backend_link = import.meta.env.VITE_BACKEND_LINK;
function App() {
  let dispatch = useDispatch();
  async function verifyLogin(){
    let response = await axios.get(`${backend_link}/verifyToken`,{
      withCredentials:true
    })
    response = response.data;
    if(response.bool){
      dispatch(setUser(response.users));
    }
  }
  useEffect(()=>{
    verifyLogin();
  },[])
  return (
   <div className="flex w-full   min-h-[100vh] bg-[#2C2638] justify-center items-center box-border">
    <Navbar />
    <ToastContainer position="top-right" />
    <Routes>
      <Route path="/auth" element={<Auth />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/profile/:id" element={<OtherProfile />}/>
      <Route path="/browse" element={<Browse />}/>
      <Route path="/view/:id" element={<View />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/messages" element={<Messaging />}/>
    </Routes>
   </div>
  )
}

export default App
