import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'
function Sidebar() {
    const navigate=useNavigate()
    const handleLogOut=()=>{
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
          to="registration"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
          Add New 
        </NavLink>
        
        {/* Employee List */}
        <NavLink
          to=""
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
          All Employee
        </NavLink>

        {/* Application Menu */}
        <NavLink
          to="allapplication"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
          Application Portal
        </NavLink>

        <NavLink
          to="postnews"
          className="hover:bg-gray-700 px-4 py-2 rounded-md transition"
          activeClassName="bg-gray-700"
        >
         News Hub
        </NavLink>

        <button onClick={handleLogOut} className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">Log Out</button>
      </nav>
    </div>
  );
}

export default Sidebar;
