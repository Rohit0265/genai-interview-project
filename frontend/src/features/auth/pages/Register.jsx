import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/hooks.auth';
const Register = () => {


const navigate = useNavigate();
const [user,setUser] = useState(null)
const [password,setPassword] = useState(null)
const [email,setEmail] = useState(null)
const {loading,handleRegister} = useAuth()



const handleSubmit =async (e)=>{
    e.preventDefault();
    await handleRegister({username,email,password})
    navigate("/")
}

if(loading){
  return(
    <main><h1>Loading.............</h1></main>
  )
}



 return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-slate-100 p-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl"> 
        <h1 className="text-2xl font-bold text-center text-white mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="text" className="block text-sm font-medium text-slate-300">Username</label>
            <input 
            onChange={(e)=>setUser(e.target.value)}
              id="username" 
              type="text" 
              placeholder="Enter your username" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
            <input
            onChange={(e)=>setEmail(e.target.value)} 
              id="email" 
              type="text" 
              placeholder="Enter email address" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
            <input 
              onChange={(e)=>setPassword(e.target.value)}
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/10 transition-all active:scale-[0.98] mt-2 cursor-pointer text-sm">
            Register
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link> </p>
      </div>
    </main>
  )
}

export default Register