import React, { useEffect } from 'react'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'


function Dashboard() {

const navigate = useNavigate()
const id=localStorage.getItem('id')
useEffect(()=>{
    axios.get('http://localhost:8000/auth',{withCredentials:true})
    .then(res=>{
        if(res.data==='success'){
            navigate(`/dashboard/${id}`)
        }
        else{
            navigate('/')
        }
    })
},[])


  return (
   <div className='w-full flex h-screen'>
       
         <Sidebar/>
       
       <div className='w-full'>
         <Outlet/>
       </div>
   </div>
  )
}

export default Dashboard
