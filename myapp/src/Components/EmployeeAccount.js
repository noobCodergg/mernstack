import React, { useEffect } from 'react'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import EmployeeMenu from './EmployeeMenu'
function EmployeeAccount() {
const id=localStorage.getItem('id')
  const navigate=useNavigate()
  useEffect(()=>{
  axios.get('http://localhost:8000/eauth',{withCredentials:true})
  .then(res=>{
    console.log(res.data)
    if(res.data==='esuccess'){
        navigate(`/account/${id}`)
    }
    else{
        navigate('/')
    }
  })
  },[])


  return (
    <div>
       <div className='w-full flex'>
       
       <EmployeeMenu/>
     
     <div className='w-full'>
       <Outlet/>
     </div>
 </div>
    </div>
  )
}

export default EmployeeAccount
