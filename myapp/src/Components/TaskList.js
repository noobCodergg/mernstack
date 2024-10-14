import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmptyFile from './EmptyFile';

const TaskList = () => {
  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const day = new Date();
  const fin = formatDate(day);
  const [tasks, setTasks] = useState([]);
  const id = localStorage.getItem('id');
  

  useEffect(() => {
    axios.get(`http://localhost:8000/gettask/${id}`)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err)); // Handle errors
  }, [id]);

  const handleStatusChange = async (uid, isTrue) => {
    // Optimistically update the state
    const updatedTasks = tasks.map(task =>
      task.uid === uid ? { ...task, status: !isTrue } : task
    );
    setTasks(updatedTasks);

    try {
      // Make the API call to update the task status
      await axios.put(`http://localhost:8000/taskcomplete/${uid}`, { status: !isTrue });
    } catch (error) {
      console.error("Error updating task status:", error);
      // Optionally, revert the change if the update fails
      setTasks(tasks); // Revert to original tasks
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 h-screen">
      <h2 className="text-2xl font-bold mb-5">Assigned Task</h2>
      {
      tasks.length<1 ? <EmptyFile/> :
      <ul className="space-y-4">
        
        {tasks.map((task) => (
          task.date === fin && (
            <li key={task.uid} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleStatusChange(task.uid, task.status)}
                    checked={task.status}
                  />
                  <h3>{task.data}</h3>
                  {
                    task.status ? <p className='text-lime-600'>Done</p> : <p className='text-red-600'>Pending</p>
                  }
                </label>
              </div>
            </li>
          )
        ))}
      </ul>
}
    </div>
  );
};

export default TaskList;

