import React, { useState } from "react";
import profile from "../assets/login_profile.jpg";
import profile2 from "../assets/signup_profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";
const backendLink = import.meta.env.VITE_BACKEND_LINK;
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  async function login(e){
    e.preventDefault();
    let data ={
      email:e.target.email.value,
      password:e.target.password.value
    }
    let response = await axios.post(`${backendLink}/login`,data,{
      withCredentials:true
    })
    response = response.data
    if(response.bool){
      toast.success("Login Successfull")
      dispatch(setUser(response.users));
      navigate('/')
    }
    else{
      toast.error("Login Unsuccessfull")
    }
  }
  async function signup(e){
    e.preventDefault();
    console.log(e.target.email)
    let data ={
      name:e.target.name.value,
      email:e.target.email.value,
      password:e.target.password.value,
      repeat_password:e.target.repeat_password.value,
      location:e.target.location.value
    }
    let response = await axios.post(`${backendLink}/register_user`,data,{
      withCredentials:true
    })
    response = response.data
    if(response.bool){
      toast.success("Registeration Successfull")
      navigate('/')
    }
    else{
      toast.error("Registeration Unsuccessfull")
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-[90%] bg-[#2C2638] p-5 mt-16">
      <div className="relative flex w-full bg-[#3A3244] h-full rounded-lg overflow-hidden shadow-lg">
        
        {/* Image Section */}
        <div>

        <div
          className={`absolute w-1/2 h-full bg-cover bg-center bg-no-repeat transition-all duration-500 ${
              isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
            style={{ backgroundImage: `url(${profile})` }}
            ></div>
        <div
          className={`absolute w-1/2 h-full bg-cover bg-center bg-no-repeat transition-all duration-500 ${
              isLogin ? "translate-x-0 opacity-0" : "translate-x-full opacity-100"
            }`}
            style={{ backgroundImage: `url(${profile2}` }}
            ></div>
        </div>

        {/* Forms Container */}
        <div className="relative w-full flex">
          

          {/* Signup Form */}
          <div className={`w-1/2 p-10 text-white flex flex-col justify-center transition-transform duration-500 ${
            isLogin ? "-translate-x-full" : "translate-x-0"
          }`}>
            <h1 className="text-4xl font-bold mb-6">Register</h1>
            <form className="flex flex-col gap-6" onSubmit={(e)=>signup(e)}>
              <div className="flex gap-3 w-full">

              <div className="flex flex-col w-full">
                <label htmlFor="name" className="text-lg">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your Name"
                  className="p-3 rounded-lg bg-[#51475A] text-white focus:outline-none"/>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-lg">Email</label>
                <input type="email" id="ema il" name="email" placeholder="Enter email"
                  className="p-3 rounded-lg bg-[#51475A] text-white focus:outline-none"/>
              </div>
                  </div>

              <div className="flex gap-3 w-full">

              <div className="flex flex-col w-full">
                <label htmlFor="password" className="text-lg">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password"
                  className="p-3 rounded-lg bg-[#51475A] text-white focus:outline-none"/>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="repeat_password" className="text-lg">Repeat Password</label>
                <input type="password" id="repeat_password" name="repeat_password" placeholder="Confirm password"
                  className="p-3 rounded-lg bg-[#51475A] text-white focus:outline-none"/>
              </div>
                  </div>

              <div className="flex flex-col">
                <label htmlFor="location" className="text-lg">Location</label>
                <input type="text" id="location" name="location" placeholder="Enter location"
                  className="p-3 rounded-lg bg-[#51475A] text-white focus:outline-none"/>
              </div>

              <button type="submit" className="bg-[#6C5F7B] p-3 rounded-lg hover:bg-[#5B4C66] transition">Register</button>
            </form>

            {/* Options */}
            <div className="mt-4 text-center">
              <button onClick={() => setIsLogin(true)} className="text-sm text-[#B8A4C9] hover:underline">Back to Login</button>
            </div>
          </div>
          {/* Login Form */}
          <div className={`w-1/2 p-10 text-white flex flex-col justify-center transition-transform duration-500 ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}>
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <form className="flex flex-col gap-6" onSubmit={(e)=>login(e)}>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter email"
                  className="p-3 rounded-lg bg-[#51475A] text-white focus:outline-none"/>
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-lg">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password"
                  className="p-3 rounded-lg bg-[#51475A] text-white focus:outline-none"/>
              </div>

              <button type="submit"  className="bg-[#6C5F7B] p-3 rounded-lg hover:bg-[#5B4C66] transition">Login</button>
            </form>

            {/* Options */}
            <div className="mt-4 flex justify-between">
              <button onClick={() => setIsLogin(false)} className="text-sm text-[#B8A4C9] hover:underline">Signup</button>
              <Link to="/forgot-password" className="text-sm text-[#B8A4C9] hover:underline">Forgot Password?</Link>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Login;
