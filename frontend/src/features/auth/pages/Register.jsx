import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/hooks.auth';
import { useTheme } from '../../theme.context';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { loading, handleRegister } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password })
    navigate("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-250 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500/10 border-t-blue-600 dark:border-t-blue-500 animate-spin"></div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full flex flex-col justify-between bg-[#f1f5f9] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 p-6 font-sans">
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center mb-6">
        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">InterviewReady</span>
        
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 text-slate-550 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-850 transition-all cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {/* Middle Card */}
      <div className="w-full flex-1 flex items-center justify-center py-6">
        <div className="w-full max-w-[420px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 shadow-lg dark:shadow-none">
          <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-1">Create an account</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6">
            Sign up to start your interview preparation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="username" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                required
                placeholder="Enter your username"
                className="w-full bg-[#fcfdfe] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                className="w-full bg-[#fcfdfe] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#fcfdfe] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-3.5 pr-10 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-550 hover:text-slate-655 dark:hover:text-slate-350 focus:outline-none cursor-pointer"
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

          <p className="text-xs text-slate-655 dark:text-slate-400 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0652dd] dark:text-blue-400 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="w-full max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800 pt-6 mt-6 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-2 md:space-y-0">
          <span className="text-sm font-bold text-slate-900 dark:text-white">InterviewReady</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs font-semibold text-slate-505 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-all">Privacy Policy</a>
            <a href="#" className="text-xs font-semibold text-slate-505 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-all">Terms of Service</a>
            <a href="#" className="text-xs font-semibold text-slate-505 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-all">Contact Support</a>
            <a href="#" className="text-xs font-semibold text-slate-505 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-all">Help Center</a>
          </div>
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-550 text-center md:text-right">
          © 2024 InterviewReady. All rights reserved. Professional Coaching Platform.
        </div>
      </footer>
    </main>
  )
}

export default Register;