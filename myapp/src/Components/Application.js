import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const ApplicationForm = () => {
  const id=localStorage.getItem('id')
   const uid=uuidv4();
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    id:id,
    status:'Pending',
    uniqueID:uid
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    axios.post('http://localhost:8000/postapp',formData)
    // Add form submission logic here
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl h-screen">
      <h1 className="text-3xl font-bold mb-6">Application Form</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Subject
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Description (Rich Text Editor) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Description (Application Details)
          </label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            className="bg-white rounded-md border border-gray-300"
            placeholder="Enter the details of your application..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;

