import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth/hooks/hooks.auth'
import axios from 'axios'

const Home = () => {
  const { user, handleLogout } = useAuth()
  
  // Form Input States
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  
  // UI & Loading States
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Uploading documents...')
  const [error, setError] = useState('')
  const [report, setReport] = useState(null)
  
  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'questions', 'preparation'
  
  // Accordion/Collapse States for Questions
  const [expandedTech, setExpandedTech] = useState({})
  const [expandedBehavioral, setExpandedBehavioral] = useState({})

  // Dynamic Loading Messages
  useEffect(() => {
    let interval
    if (loading) {
      const messages = [
        'Uploading resume and details...',
        'Parsing resume PDF contents...',
        'Comparing self description with job requirements...',
        'Analyzing core skills and identifying gaps...',
        'Formulating technical & behavioral interview questions...',
        'Designing a personalized day-by-day preparation plan...',
        'Almost there, polishing your interview report...'
      ]
      let idx = 0
      interval = setInterval(() => {
        idx = (idx + 1) % messages.length
        setLoadingMessage(messages[idx])
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [loading])

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === 'application/pdf') {
        setResumeFile(file)
        setError('')
      } else {
        setError('Please upload only PDF files.')
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setResumeFile(file)
        setError('')
      } else {
        setError('Please upload only PDF files.')
      }
    }
  }

  const removeFile = () => {
    setResumeFile(null)
  }

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!jobDescription.trim()) {
      setError('Job description is required.')
      return
    }
    if (!resumeFile) {
      setError('Please upload your resume PDF.')
      return
    }

    setLoading(true)
    setError('')
    
    const formData = new FormData()
    formData.append('resume', resumeFile)
    formData.append('jobDescription', jobDescription)
    formData.append('selfDescription', selfDescription)

    try {
      const response = await axios.post('http://localhost:3000/api/interview', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      
      if (response.data && response.data.interviewReport) {
        setReport(response.data.interviewReport)
      } else {
        setError('Something went wrong. Could not parse report.')
      }
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.message || 
        'Failed to generate report. Please check your inputs and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setReport(null)
    setJobDescription('')
    setSelfDescription('')
    setResumeFile(null)
    setError('')
  }

  // Toggle accordions
  const toggleTech = (index) => {
    setExpandedTech(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const toggleBehavioral = (index) => {
    setExpandedBehavioral(prev => ({ ...prev, [index]: !prev[index] }))
  }

  // Helper for match score coloring
  const getScoreColor = (score) => {
    if (score >= 75) return 'text-emerald-500 stroke-emerald-500 border-emerald-500/20 bg-emerald-500/5'
    if (score >= 50) return 'text-amber-500 stroke-amber-500 border-amber-500/20 bg-amber-500/5'
    return 'text-rose-500 stroke-rose-500 border-rose-500/20 bg-rose-500/5'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                Interview AI
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                Copilot
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-800">
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs uppercase">
                {user?.username ? user.username[0] : 'U'}
              </div>
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                {user?.username || user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        
        {/* State 1: Generating (Loading screen) */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Generating Report</h2>
            <p className="text-slate-400 text-sm max-w-md text-center transition-all duration-300 animate-pulse">
              {loadingMessage}
            </p>
          </div>
        )}

        {/* State 2: Input Form (when not loading and report is not generated) */}
        {!loading && !report && (
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Ready for your next interview?
              </h1>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                Upload your resume, paste the target job description, and describe yourself to get a personalized AI preparation report.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-start space-x-3 text-sm">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/10">
              
              {/* Job Description Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="jobdescription" className="block text-sm font-semibold text-slate-200">
                    Job Description <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs text-slate-500">Provide complete requirements</span>
                </div>
                <textarea
                  id="jobdescription"
                  name="jobdescription"
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter or paste the full job description here (e.g. key responsibilities, qualifications, and required skills)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                />
              </div>

              {/* Resume File Upload (Drag and Drop) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Upload Resume <span className="text-rose-500">*</span>
                </label>
                
                {!resumeFile ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${
                      dragActive 
                        ? 'border-indigo-500 bg-indigo-500/5' 
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/50'
                    }`}
                  >
                    <svg className="w-10 h-10 text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    
                    <p className="text-sm text-slate-300 font-medium mb-1.5 text-center">
                      Drag and drop your resume here
                    </p>
                    <p className="text-xs text-slate-500 mb-4 text-center">
                      Accepts only PDF format
                    </p>
                    
                    <label
                      htmlFor="resume"
                      className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold border border-slate-800 hover:border-slate-700 transition-all active:scale-[0.98]"
                    >
                      Select PDF File
                    </label>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-rose-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-200 truncate">
                          {resumeFile.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                        </p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-slate-900 rounded-lg text-slate-500 hover:text-rose-400 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Self Description Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="selfdescription" className="block text-sm font-semibold text-slate-200">
                    Self Description / Context <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <span className="text-xs text-slate-500">Provide details about career goals</span>
                </div>
                <textarea
                  id="selfdescription"
                  name="selfdescription"
                  rows={4}
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Tell the AI about your experience level, key achievements, areas you want to highlight, or specific concerns you have..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3.5 px-4 rounded-2xl shadow-xl shadow-indigo-600/15 transition-all active:scale-[0.99] cursor-pointer text-sm flex items-center justify-center space-x-2"
              >
                <span>Generate Interview Report</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* State 3: Report Display Dashboard */}
        {!loading && report && (
          <div className="w-full max-w-6xl mx-auto space-y-8 animate-fadeIn">
            {/* Report Header Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden shadow-2xl">
              {/* Background ambient glow */}
              <div className="absolute -right-24 -top-24 w-60 h-60 bg-indigo-500/5 blur-3xl rounded-full"></div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleReset}
                  className="p-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-2xl text-slate-400 hover:text-white transition-all active:scale-95"
                  title="Generate another report"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                    Interview Analytics Report
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Generated on {new Date(report.createdAt || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleReset}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4.5 py-2.5 rounded-2xl transition-all text-xs sm:text-sm flex items-center space-x-1.5 shadow-lg shadow-indigo-600/10 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>New Analysis</span>
                </button>
              </div>
            </div>

            {/* Dashboard Tabs & Metrics Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Sidebar Cards (Score & Skill Gaps) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Match Score Radial Display */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center flex flex-col items-center shadow-lg">
                  <h3 className="text-sm font-semibold text-slate-400 mb-6">Profile Match Score</h3>
                  
                  {/* Radial Score Gauge */}
                  <div className="relative flex items-center justify-center mb-5">
                    {/* SVG Progress Circle */}
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        className="stroke-slate-950 fill-none"
                        strokeWidth="10"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        className={`fill-none transition-all duration-1000 ${
                          report.matchScore >= 75 ? 'stroke-emerald-500' : report.matchScore >= 50 ? 'stroke-amber-500' : 'stroke-rose-500'
                        }`}
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 68}
                        strokeDashoffset={2 * Math.PI * 68 - (2 * Math.PI * 68 * (report.matchScore || 0)) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    {/* Centered Percentage Text */}
                    <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-extrabold text-white tracking-tight">
                        {report.matchScore || 0}%
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">
                        Match
                      </span>
                    </div>
                  </div>

                  {/* Interpretation Message */}
                  <div className={`px-4 py-2 rounded-xl border text-xs font-semibold ${getScoreColor(report.matchScore || 0)}`}>
                    {report.matchScore >= 75 
                      ? 'Strong Profile Alignment' 
                      : report.matchScore >= 50 
                        ? 'Moderate Alignment - Gaps Exist' 
                        : 'Significant Gaps Identified'}
                  </div>
                </div>

                {/* Skill Gaps Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
                  <h3 className="text-sm font-semibold text-slate-400 mb-4 flex items-center space-x-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Skill Gaps / Growth Areas</span>
                  </h3>
                  
                  {report.skillgaps && report.skillgaps.length > 0 ? (
                    <div className="space-y-3">
                      {report.skillgaps.map((gap, index) => (
                        <div key={index} className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                          <span className="text-xs font-medium text-slate-200 truncate mr-2">
                            {gap.skill}
                          </span>
                          
                          {/* Severity badge */}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            gap.severity === 'high' 
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                              : gap.severity === 'medium'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {gap.severity}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      No matching gaps found! Excellent profile alignment.
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Tabbed Detailed Content */}
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg flex flex-col">
                
                {/* Tabs Selector Bar */}
                <div className="flex border-b border-slate-800 bg-slate-900">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                      activeTab === 'overview'
                        ? 'border-indigo-500 text-indigo-400 bg-slate-950/20'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Context Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('questions')}
                    className={`flex-1 py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                      activeTab === 'questions'
                        ? 'border-indigo-500 text-indigo-400 bg-slate-950/20'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Mock Interview Questions
                  </button>
                  <button
                    onClick={() => setActiveTab('preparation')}
                    className={`flex-1 py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                      activeTab === 'preparation'
                        ? 'border-indigo-500 text-indigo-400 bg-slate-950/20'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Preparation Timeline
                  </button>
                </div>

                {/* Tab content wrapper */}
                <div className="p-6 sm:p-8 min-h-[400px]">
                  
                  {/* TAB 1: OVERVIEW */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-slate-200 mb-2 uppercase tracking-wide">Target Job Profile</h4>
                        <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-xs sm:text-sm text-slate-300 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
                          {report.jobDescription || 'N/A'}
                        </div>
                      </div>

                      {report.selfDescription && (
                        <div>
                          <h4 className="text-sm font-bold text-slate-200 mb-2 uppercase tracking-wide">Your Supplied Context</h4>
                          <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-xs sm:text-sm text-slate-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                            {report.selfDescription}
                          </div>
                        </div>
                      )}

                      <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4.5 flex items-start space-x-3 text-xs sm:text-sm">
                        <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-slate-300 leading-relaxed">
                          <strong>AI Insights Tip:</strong> Navigate to the <strong>Mock Interview Questions</strong> tab to practice technical and behavioral questions tailored directly to this job description and your background. Use the <strong>Preparation Timeline</strong> to prioritize your studying steps.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: QUESTIONS */}
                  {activeTab === 'questions' && (
                    <div className="space-y-8">
                      {/* Technical Questions */}
                      <div>
                        <h3 className="text-sm font-extrabold text-indigo-400 mb-4 uppercase tracking-wider flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          <span>Technical Practice Questions</span>
                        </h3>
                        
                        {report.technicalQuestions && report.technicalQuestions.length > 0 ? (
                          <div className="space-y-4">
                            {report.technicalQuestions.map((q, idx) => (
                              <div key={idx} className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden transition-all">
                                {/* Header / Trigger */}
                                <button
                                  onClick={() => toggleTech(idx)}
                                  className="w-full p-4 flex items-start justify-between text-left cursor-pointer hover:bg-slate-900/50"
                                >
                                  <div className="pr-4">
                                    <span className="text-xs font-bold text-slate-500 mr-2">Q{idx + 1}.</span>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{q.question}</span>
                                  </div>
                                  <span className="shrink-0 mt-1 text-slate-400">
                                    {expandedTech[idx] ? (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    )}
                                  </span>
                                </button>
                                
                                {/* Collapsible Content */}
                                {expandedTech[idx] && (
                                  <div className="px-4 pb-4 pt-1 border-t border-slate-900 bg-slate-950 space-y-3.5 text-xs sm:text-sm">
                                    <div>
                                      <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-400 mb-1.5 flex items-center space-x-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>Interviewer Intention / Target Skill</span>
                                      </h5>
                                      <p className="text-slate-400 leading-relaxed pl-5">{q.intention}</p>
                                    </div>
                                    <div>
                                      <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400 mb-1.5 flex items-center space-x-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Sample Recommended Response / Explanation</span>
                                      </h5>
                                      <p className="text-slate-300 leading-relaxed pl-5 whitespace-pre-line">{q.answer}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 text-xs py-2">No technical questions generated.</p>
                        )}
                      </div>

                      {/* Behavioral Questions */}
                      <div className="pt-4 border-t border-slate-800">
                        <h3 className="text-sm font-extrabold text-indigo-400 mb-4 uppercase tracking-wider flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>Behavioral Practice Questions</span>
                        </h3>
                        
                        {report.behavioralQuestions && report.behavioralQuestions.length > 0 ? (
                          <div className="space-y-4">
                            {report.behavioralQuestions.map((q, idx) => (
                              <div key={idx} className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden transition-all">
                                {/* Header / Trigger */}
                                <button
                                  onClick={() => toggleBehavioral(idx)}
                                  className="w-full p-4 flex items-start justify-between text-left cursor-pointer hover:bg-slate-900/50"
                                >
                                  <div className="pr-4">
                                    <span className="text-xs font-bold text-slate-500 mr-2">Q{idx + 1}.</span>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{q.question}</span>
                                  </div>
                                  <span className="shrink-0 mt-1 text-slate-400">
                                    {expandedBehavioral[idx] ? (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    )}
                                  </span>
                                </button>
                                
                                {/* Collapsible Content */}
                                {expandedBehavioral[idx] && (
                                  <div className="px-4 pb-4 pt-1 border-t border-slate-900 bg-slate-950 space-y-3.5 text-xs sm:text-sm">
                                    <div>
                                      <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-400 mb-1.5 flex items-center space-x-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>Intention / Psychological Focus</span>
                                      </h5>
                                      <p className="text-slate-400 leading-relaxed pl-5">{q.intention}</p>
                                    </div>
                                    <div>
                                      <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400 mb-1.5 flex items-center space-x-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Sample STAR Method Response</span>
                                      </h5>
                                      <p className="text-slate-300 leading-relaxed pl-5 whitespace-pre-line">{q.answer}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 text-xs py-2">No behavioral questions generated.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PREPARATION PLAN */}
                  {activeTab === 'preparation' && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2.5 mb-2">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="text-sm font-extrabold text-indigo-400 uppercase tracking-wider">
                          Structured Preparation Plan
                        </h3>
                      </div>

                      {report.preparationPlan && report.preparationPlan.length > 0 ? (
                        <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
                          {report.preparationPlan.map((plan, index) => (
                            <div key={index} className="relative">
                              {/* Day Marker Dot */}
                              <div className="absolute -left-10 top-0.5 bg-indigo-600 border border-slate-900 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white shadow-lg">
                                D{plan.day}
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                                  <span>Day {plan.day}:</span>
                                  <span className="text-indigo-400">{plan.focus}</span>
                                </h4>
                                
                                {plan.task && plan.task.length > 0 ? (
                                  <ul className="mt-3 space-y-2.5">
                                    {plan.task.map((t, tIdx) => (
                                      <li key={tIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300">
                                        <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="leading-relaxed">{t}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-slate-500 text-xs mt-1">No specific tasks allocated.</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500 text-xs py-2">No preparation plan generated.</p>
                      )}
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Sticky Bottom Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600 mt-auto">
        <p>© {new Date().getFullYear()} Interview AI. Powered by Gemini. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home