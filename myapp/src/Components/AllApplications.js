import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import AllApplicationCard from './AllApplicationCard'
import EmptyFile from './EmptyFile'
function AllApplications() {
 const [data,setData]=useState([])
 

 useEffect(()=>{
   axios.get('http://localhost:8000/allapplication')
   .then(res=>setData(res.data))
 },[])
  return (
    <div className="flex flex-wrap justify-center h-screen">
    {
      data.length<1 ? <h1>No Application Found</h1> :
    <div className='flex flex-wrap justify-center h-screen'>
    {data.map((item) => (
       <Link to={`/allapplicationdetail/${item.uniqueID}`}><AllApplicationCard data={item} key={item.uniqueID}/></Link>
    ))}
  </div>
}
</div>
  )
}

export default AllApplications
