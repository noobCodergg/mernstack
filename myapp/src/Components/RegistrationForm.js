import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    joiningDate: '',
    address: '',
    bloodGroup: '',
    title: '',
    coverPhoto: null,
    profilePicture: null,
    contact: '',
    role: '',
    email: '',
    password: '',
    status:false
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file change and convert to base64
  const handleFileChange = async (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, [name]: base64 });
    }
  };

  const handleSubmit = (e) => {
    const id=localStorage.getItem('id')
    e.preventDefault();
    axios.post('http://localhost:8000/createaccount', formData)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

      navigate(`/dashboard/${id}`)
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 shadow-md bg-white rounded-lg h-screen">
      <h2 className="text-2xl font-bold mb-5">Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ID */}
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={formData.id}
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className='flex wrap justify-between'>
          {/* Joining Date */}
          <div>
            <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">Joining Date</label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.joiningDate}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="" disabled>Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Cover Photo and Profile Picture */}
        <div className='flex wrap justify-between'>
          <div>
            <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">Cover Photo</label>
            <input
              type="file"
              id="coverPhoto"
              name="coverPhoto"
              className="mt-1 block w-full text-sm text-gray-500"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              className="mt-1 block w-full text-sm text-gray-500"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Contact and Role */}
        <div className='flex wrap justify-around'>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          {/* Email and Password */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
