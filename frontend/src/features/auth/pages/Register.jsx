import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/hooks.auth';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password })
    navigate("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500/10 border-t-blue-600 animate-spin"></div>
          <p className="text-slate-500 text-sm font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full flex flex-col justify-between bg-[#f1f5f9] text-slate-800 p-6 font-sans">
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto flex justify-start items-center mb-6">
        <span className="text-xl font-bold text-slate-900 tracking-tight">InterviewReady</span>
      </div>

      {/* Middle Card */}
      <div className="w-full flex-1 flex items-center justify-center py-6">
        <div className="w-full max-w-[420px] bg-white border border-slate-200/80 rounded-2xl p-8 shadow-lg shadow-slate-200/30">
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-1">Create an account</h1>
          <p className="text-xs text-slate-500 text-center mb-6">
            Sign up to start your interview preparation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="username" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                required
                placeholder="Enter your username"
                className="w-full bg-[#fcfdfe] border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                className="w-full bg-[#fcfdfe] border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#fcfdfe] border border-slate-200 rounded-lg pl-3.5 pr-10 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0652dd] hover:bg-[#0048d0] text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all active:scale-[0.98] mt-4 cursor-pointer text-sm"
            >
              Sign Up
            </button>
          </form>

          <p className="text-xs text-slate-600 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0652dd] font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="w-full max-w-7xl mx-auto border-t border-slate-200/80 pt-6 mt-6 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-2 md:space-y-0">
          <span className="text-sm font-bold text-slate-900">InterviewReady</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-all">Privacy Policy</a>
            <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-all">Terms of Service</a>
            <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-all">Contact Support</a>
            <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-all">Help Center</a>
          </div>
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400 text-center md:text-right">
          © 2024 InterviewReady. All rights reserved. Professional Coaching Platform.
        </div>
      </footer>
    </main>
  )
}

export default Register;