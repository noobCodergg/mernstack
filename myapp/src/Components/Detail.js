import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
const Detail = () => {
    function formatDate(date) {
        return date.toISOString().split("T")[0];
      }
    
      const day = new Date();
      const fin=formatDate(day);

    const navigate=useNavigate()
    const {id}=useParams();
    const status=localStorage.getItem('status')
    const [employee,setEmployee]=useState({})
    const [task,setTask]=useState([])
    
    useEffect(()=>{

        axios.get(`http://localhost:8000/detail/${id}`)
        .then(res=>setEmployee(res.data))

        axios.get(`http://localhost:8000/gettask/${id}`)
        .then(res=>setTask(res.data))

    },[task])

    
    const d=new Date();
    const [data, setData] = useState({
        data:'',
        status:false,
        uid:uuidv4(),
        id:id,
        date:d.toISOString().split('T')[0]
    });
    const [message, setMessage] = useState('');
  
    // Function to handle data submission
    const handleSubmit = async (e) => {
  
    axios.post(`http://localhost:8000/posttask`, data)
    };
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Cover Photo */}
            <div className="w-full h-64">
                <img
                    className="w-full h-full object-cover"
                    src={employee.coverPhoto}
                    alt="Cover"
                />
            </div>

            {/* Profile Section */}
            <div className="flex justify-center -mt-16">
                <img
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                    src={employee.profilePicture}
                    alt={employee.name}
                />
            </div>

            {/* Employee Details Section */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                {/* Name and Title */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{employee.name}</h1>
                    <p className="text-gray-600">{employee.title}</p>
                </div>

                {/* Status */}
                <div className="flex justify-center mt-4">
                    <span
                        className={`px-4 py-2 rounded-full text-white ${
                            employee.status ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    >
                        {employee.status===true ? <p>Active</p> : <p>Logged Out</p>}
                    </span>
                </div>

                {/* Employee Info Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Joining Date */}
                    <div>
                        <h3 className="text-lg font-semibold">Joining Date</h3>
                        <p className="text-gray-700">{employee.joiningDate}</p>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-lg font-semibold">Address</h3>
                        <p className="text-gray-700">{employee.address}</p>
                    </div>

                    {/* Blood Group */}
                    <div>
                        <h3 className="text-lg font-semibold">Blood Group</h3>
                        <p className="text-gray-700">{employee.bloodGroup}</p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold">Contact</h3>
                        <p className="text-gray-700">{employee.contact}</p>
                    </div>

                    {/* Role */}
                    <div>
                        <h3 className="text-lg font-semibold">Role</h3>
                        <p className="text-gray-700">{employee.role}</p>
                    </div>

                    {/* Email */}
                    <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-gray-700">{employee.email}</p>
                    </div>

                </div>

                {/* Bio */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold">Bio</h3>
                    <p className="text-gray-700 mt-2">{employee.bio}</p>
                </div>
{
    status==='success' &&
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <h3 className="text-lg font-semibold">Assign New Task</h3>

                  <div>
                  <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={data.task}
          onChange={(e) => setData(d=>({...d,data:e.target.value}))}
          placeholder="Enter New Task"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
        <button type="submit" className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">Add Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
 </div>
 }
 
{
    status==='success' && <h3 className="text-2xl font-bold mb-5 p-6">Assigned Task</h3>
}
 {
    status==='success' &&
    task.map((item)=>{
        return item.date===fin && <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 p-6">{item.data}{
            item.status?<p className='text-lime-600'>Done</p> : <p className='text-red-600'>Pending</p>
        }</div>
    })
 }
 

            </div>
        </div>
    );
};

export default Detail;


