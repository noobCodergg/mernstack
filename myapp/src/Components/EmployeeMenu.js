import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'
function EmployeeMenu() {
    const id=localStorage.getItem('id')
    const navigate=useNavigate()
    const handleLogOut=()=>{
      axios.put(`http://localhost:8000/setstatus/${id}`,{status:false})

        axios.get('http://localhost:8000/logout',{withCredentials:true})
        .then(res=>console.log(res))

        navigate('/')
    }
  return (
    <div className="h-auto w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-xl font-semibold">App Menu</h1>
      </div>
      
      <nav className="flex flex-col p-4 space-y-4">
        {/* Add New Employee */}
        <NavLink
          to={`/detail/${id}`}
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
         My Account
        </NavLink>
        
        {/* Employee List */}
        <NavLink
          to="list"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
          All Employee
        </NavLink>

        {/* Application Menu */}
        <NavLink
          to="news"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
          News 
        </NavLink>

        <NavLink
          to="notices"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
          Notices
        </NavLink>

        <NavLink
          to="myapplications"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
        My Applications
        </NavLink>


        <NavLink
          to="application"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
         Application Form
        </NavLink>

        <NavLink
          to="performance"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
         Performance
        </NavLink>

        <NavLink
          to=""
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
         Assigned Tasks
        </NavLink>

        <button onClick={handleLogOut} className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">Log Out</button>
      </nav>
    </div>
  );
}

export default EmployeeMenu;