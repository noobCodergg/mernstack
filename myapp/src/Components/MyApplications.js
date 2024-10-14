import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MyApplicationCard from './MyApplicationCard'
import EmptyFile from './EmptyFile'
function MyApplications() {
  const id=localStorage.getItem('id')
  const [app,setApp]=useState([])

  useEffect(()=>{
   axios.get(`http://localhost:8000/myapp/${id}`)
   .then(res=>setApp(res.data))
  },[])

  return (
    <div className='container mx-auto p-6 max-w-3xl h-screen'>
      
     <h2 className="text-2xl font-bold mb-5">All Applications</h2>
     {
    app.length<1 ? <EmptyFile/> :
    <div className='flex flex-wrap justify-center'>
      {
        app.map((item)=>{
          return <Link to={`/applicationdetail/${item.uniqueID}`}><MyApplicationCard key={item.uniqueID} item={item} /></Link>
        })
      }
    </div>
}

    </div>
  )
}

export default MyApplications
