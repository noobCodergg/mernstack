import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Login() {
  const navigate=useNavigate();
  
  useEffect(()=>{
    const id= localStorage.getItem('id')
    axios.get('http://localhost:8000/auth',{withCredentials:true})
    .then(res=>{
      if(res.data==='success'){
         navigate(`/dashboard/${id}`)
      }
      else{
        axios.get('http://localhost:8000/eauth',{withCredentials:true})
        .then(res=>{
          if(res.data==='esuccess'){
            navigate(`/account/${id}`)
          }
          else{
            navigate('/')
          }
        })
      }
    })
  },[])
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [error,setError]=useState();



const handleEmail=(e)=>{
    setEmail(e.target.value)
}

const handlePassword=(e)=>{
    setPassword(e.target.value)
}

const handleSubmit=(e)=>{
    e.preventDefault()
   
    axios.post('http://localhost:8000/login',{email,password},{withCredentials:true})
    .then(res=>{
      setError(res.data)
      console.log(res.data)
      if(res.data.role==='Employee'){
        const id=res.data.id;
        localStorage.setItem('id',id)
        localStorage.setItem('status',"esuccess")
        axios.put(`http://localhost:8000/setstatus/${res.data.id}`,{status:true})
        navigate(`/account/${id}`)
      }
      if(res.data.role==='Admin'){
        const id=res.data.id
        localStorage.setItem('id',id)
        localStorage.setItem('status',"success")
        navigate(`/dashboard/${id}`)
      }
    })
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">Login</h2>
       {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleEmail}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handlePassword}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
