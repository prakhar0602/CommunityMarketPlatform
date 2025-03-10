import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
const backend_link = import.meta.env.VITE_BACKEND_LINK;
const ProtectedRoutes = ({children}) => {
  
    const [login,setLogin] = useState(true);
    async function verifyLogin(){
        let response = await axios.get(`${backend_link}/verifyToken`,{
            withCredentials:true
        });
        response= response.data;
        setLogin(response.bool)
    }
    useEffect(()=>{
        verifyLogin();
    },[])
    return (
        login?children:<Navigate to={'/auth'}/>
  )
}

export default ProtectedRoutes