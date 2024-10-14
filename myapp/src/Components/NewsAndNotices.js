import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmptyFile from './EmptyFile';
const NewsAndNotices = () => {
  // Sample data for news and notices

  const [news,setNews]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/allnews')
    .then(res=>setNews(res.data))
  },[])



  return (
    <div className="max-w-2xl mx-auto p-4 h-screen">
     <h2 className="text-2xl font-bold mb-5">News</h2>
      {
      news.length<1 ? <EmptyFile/> :
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-2">{item.description}</p>
              <span className="text-gray-500 text-sm">{item.date}</span>
            </div>
          ))}
        </div>
      </section>
}
     
    </div>
  );
};

export default NewsAndNotices;
