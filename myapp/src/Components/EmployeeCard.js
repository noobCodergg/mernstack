// EmployeeCard.jsx
import React from 'react';

const EmployeeCard = ({ employee }) => {
    return (
        <div className="max-w-sm  rounded overflow-hidden shadow-lg bg-white m-4">
            <img
                className="w-full h-48 object-cover"
                src={employee.profilePicture}
                alt={employee.name}
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p className="text-gray-700">{employee.title}</p>
                <p className="text-gray-600">{employee.email}</p>
                {
                    employee.status===true ? <p className='bg-lime-400 rounded-full w-2 h-2 mt-4 shadow-2xl shadow-gray-400	'></p> : <p className='bg-red-400 rounded-full w-2 h-2 mt-4'></p>
                }
            </div>
        </div>
    );
};

export default EmployeeCard;
