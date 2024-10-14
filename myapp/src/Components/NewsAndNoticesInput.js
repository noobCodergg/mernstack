import React, { useState } from 'react';
import axios from 'axios'
const NewsAndNoticesInput = () => {
  // State for form inputs
  const [news, setNews] = useState({ title: '', description: '', date: '' });
  const [notice, setNotice] = useState({ title: '', description: '', date: '' });

  // Handlers for input changes
  const handleNewsChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleNoticeChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  // Submission handlers
  const handleNewsSubmit = (e) => {
    e.preventDefault();
    console.log('News:', news);
    axios.post('http://localhost:8000/news',news)
    .then(res=>console.log(res.data))
    setNews({ title: '', description: '', date: '' }); // Reset the form
  };

  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    console.log('Notice:', notice);
    axios.post('http://localhost:8000/notice',notice)
    setNotice({ title: '', description: '', date: '' }); // Reset the form
  };

  return (
    <div className="container mx-auto p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6">Add News & Notices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* News Input Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Add News</h2>
          <form onSubmit={handleNewsSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="newsTitle">
                Title
              </label>
              <input
                id="newsTitle"
                name="title"
                type="text"
                value={news.title}
                onChange={handleNewsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter news title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="newsDescription">
                Description
              </label>
              <textarea
                id="newsDescription"
                name="description"
                value={news.description}
                onChange={handleNewsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter news description"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="newsDate">
                Date
              </label>
              <input
                id="newsDate"
                name="date"
                type="date"
                value={news.date}
                onChange={handleNewsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add News
            </button>
          </form>
        </div>

        {/* Notices Input Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Add Notice</h2>
          <form onSubmit={handleNoticeSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="noticeTitle">
                Title
              </label>
              <input
                id="noticeTitle"
                name="title"
                type="text"
                value={notice.title}
                onChange={handleNoticeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter notice title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="noticeDescription">
                Description
              </label>
              <textarea
                id="noticeDescription"
                name="description"
                value={notice.description}
                onChange={handleNoticeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter notice description"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="noticeDate">
                Date
              </label>
              <input
                id="noticeDate"
                name="date"
                type="date"
                value={notice.date}
                onChange={handleNoticeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Add Notice
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsAndNoticesInput;
