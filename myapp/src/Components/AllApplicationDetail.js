import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function AllApplicationDetail() {
const {uniqueID}=useParams();
const navigate=useNavigate();
const [data,setData]=useState({})
const id=localStorage.getItem('id')
useEffect(()=>{
  axios.get(`http://localhost:8000/allapplicationdetail/${uniqueID}`)
  .then(res=>setData(res.data))
},[])



const handleApproved=()=>{
    axios.put(`http://localhost:8000/updatestatus/${uniqueID}`,{status:'Approved'})
}

const handleDecline=()=>{
    axios.put(`http://localhost:8000/updatestatus/${uniqueID}`,{status:'Rejected'})
}
  return (
    <div className="container mx-auto p-6 max-w-lg h-screen">
    <div className="bg-white p-5 shadow-lg rounded-lg border border-gray-200">
     
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {data.name}
      </h2>

      
      <p className="text-gray-700 text-base">
        {data.description}
      </p>

      <p className="text-gray-700 text-base">
        {data.email}
      </p>

      <button className='btn-1 pl-4 pr-4 pt-1 pb-1 border-2 mt-6 text-lime-600' onClick={handleApproved}>Approve</button>
    <button className='btn-1 pl-4 pr-4 pt-1 pb-1 border-2 m-6 text-red-600' onClick={handleDecline}>Reject</button>
    </div> 
  </div>
  )
}

export default AllApplicationDetail