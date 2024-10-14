import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import EmptyFile from './EmptyFile';

// Register the required components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Performance() {
    const labels = [];
const day=new Date();
const name=day.getDay();
  

  const id = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({}); // Initialize chartData state

  const array = Array(7).fill(0);  // Initialize array with zeros
  const array1 = Array(7).fill(0); // Initialize array with zeros

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const date = new Date();
  const dayArray = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(date);
    day.setDate(date.getDate() - i);
    labels.push(formatDate(day))
    return formatDate(day);
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/gettask/${id}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.error(err)); // Handle errors
  }, [id]); 

  
  useEffect(() => {
    if (data.length === 0) return; // Avoid unnecessary calculations if data is empty

    const newArray = Array(7).fill(0);
    const newArray1 = Array(7).fill(0);

    dayArray.forEach((day, index) => {
      const completedTasks = data.filter(item => item.date === day && item.status).length;
      const totalTasks = data.filter(item => item.date === day).length;

      newArray[index] = completedTasks;  // Completed tasks
      newArray1[index] = totalTasks;      // Total tasks
    });

    setChartData({ // Update chartData state


      labels: labels,
      datasets: [
        {
          label: 'Total Tasks',
          data: newArray1,
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Color for Total Task Dataset
        },
        {
          label: 'Tasks Completed',
          data: newArray,
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color for Completed Task Dataset
        },
      ],
    });
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Weekly Performance Overview', // Chart title
      },
    },
  };

  return (
    <div className='h-screen'>
     
      {chartData.labels ? ( // Check if chartData has labels before rendering
        <Bar data={chartData} options={options} /> // Render the Bar Chart
      ) : (
        <div className='h-full w-full flex justify-center items-center'>
        <h1>You haven't Completed Any Task Yet</h1> 
        </div>
      )}
      {name}
    
    </div>
  );
}

export default Performance;
