import React from 'react'

function AllApplicationard({data}) {
  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 p-6 ">
    <h2 className="text-xl font-semibold">{data.name}</h2>
    <p className="text-gray-600">{data.email}</p>
    <p className='text-gray-600'>{data.status}</p>
</div>
  )
}

export default AllApplicationard
