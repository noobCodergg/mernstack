import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function ApplicationDetail() {
const {uniqueID}=useParams();

const [data,setData]=useState({})

console.log(uniqueID)
useEffect(()=>{
  axios.get(`http://localhost:8000/myappdetail/${uniqueID}`)
  .then(res=>setData(res.data))
},[])
  return (
    <div className="container mx-auto p-6 max-w-lg">
    <div className="bg-white p-5 shadow-lg rounded-lg border border-gray-200">
      {/* Email Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {data.name}
      </h2>

      {/* Email Description */}
      <p className="text-gray-700 text-base">
        {data.description}
      </p>
    </div>
  </div>
  )
}

export default ApplicationDetail
