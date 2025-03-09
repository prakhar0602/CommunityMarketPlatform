import axios from 'axios'
import React from 'react'
const backend = import.meta.env.VITE_BACKEND_LINK
const Home = () => {
    async function verify(){
        let response = await axios.get(`${backend}/verifyToken`,{
            withCredentials:true
        })
        console.log(response.data)
    }
  return (
    <div>Home
        <button className='bg-red-200 p-5' onClick={()=>verify()}>Verify</button>
    </div>
  )
}

export default Home