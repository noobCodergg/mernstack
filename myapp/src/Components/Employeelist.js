// EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
const Employeelist = () => {
   const [employees,setEmployee]=useState([])

   useEffect(()=>{
    axios.get('http://localhost:8000/all')
    .then(res=>setEmployee(res.data))
   },[employees])
    return (
        <div className="flex flex-wrap justify-center h-screen">
            {employees.map((employee) => (
                <Link to={`/detail/${employee.id}`}><EmployeeCard key={employee.id} employee={employee} /></Link>
            ))}
        </div>
    );
};

export default Employeelist;

