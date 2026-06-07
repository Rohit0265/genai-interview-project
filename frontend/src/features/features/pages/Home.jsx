import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../auth/hooks/hooks.auth'
import axios from 'axios'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import { useTheme } from '../../theme.context'
const Home = () => {
 


  const { user, handleLogout } = useAuth()
  const { loading, generateReport, reports, getAllReports } = useInterview()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const resumeInputRef = useRef(null)

  // Form Input States
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)

  // UI & Loading States
  const [isGenerating, setIsGenerating] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Uploading documents...')
  const [error, setError] = useState('')

  // Fetch reports on mount
  useEffect(() => {
    getAllReports()
  }, [])

  // Dynamic Loading Messages
  useEffect(() => {
    let interval
    if (isGenerating) {
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
  }, [isGenerating])

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
    if (resumeInputRef.current) {
      resumeInputRef.current.value = ''
    }
  }

  const handleReset = () => {
    setJobDescription('')
    setSelfDescription('')
    setResumeFile(null)
    setError('')
    if (resumeInputRef.current) {
      resumeInputRef.current.value = ''
    }
  }

  const handleGenerateReport = async () => {
    if (!jobDescription) {
      alert("Job Description is required")
      return
    }
    if (!selfDescription) {
      alert("Self Description is required")
      return
    }
    if (!resumeFile) {
      alert("Resume is required")
      return
    }
    try {
      setError('')
      setIsGenerating(true)
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile
      })
      if (data && data._id) {
        navigate(`/interview/${data._id}`)
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to generate report. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleGenerateReport()
  }


  // Helper for match score coloring
  const getScoreColor = (score) => {
    if (score >= 75) return 'text-emerald-500 stroke-emerald-500 border-emerald-500/20 bg-emerald-500/5'
    if (score >= 50) return 'text-amber-500 stroke-amber-500 border-amber-500/20 bg-amber-500/5'
    return 'text-rose-500 stroke-rose-500 border-rose-500/20 bg-rose-500/5'
  }



  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 font-sans flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0652dd] p-2 rounded-xl shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Interview AI
              </span>

            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer mr-1"
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

            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                {user?.username ? user.username[0] : 'U'}
              </div>
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium hidden sm:inline">
                {user?.username || user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-start">
        
        {/* State 1: Generating (Loading screen) */}
        {isGenerating && (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-blue-500/10 border-t-blue-600 dark:border-t-blue-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Generating Report</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md text-center transition-all duration-300 animate-pulse">
              {loadingMessage}
            </p>
          </div>
        )}

        {/* State 2: Input Form (when not loading) */}
        {!isGenerating && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                Welcome back, {user?.username ? user.username.split(' ')[0] : 'User'}
              </h1>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                Analyze your profile against specific job roles to prepare for your next career milestone.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-start space-x-3 text-sm">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none flex flex-col">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
                
                {/* Left Column (Job Description & Self Description) - 7/12 cols */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Job Description Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="jobdescription" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Job Description
                    </label>
                    <textarea
                      id="jobdescription"
                      rows={6}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full job description here..."
                      className="w-full bg-[#fcfdfe] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Self Description Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="selfdescription" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Self Description / Notes
                    </label>
                    <textarea
                      id="selfdescription"
                      rows={4}
                      value={selfDescription}
                      onChange={(e) => setSelfDescription(e.target.value)}
                      placeholder="Add any specific context, career goals, or focus areas for this analysis..."
                      className="w-full bg-[#fcfdfe] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Right Column (Resume Upload Box & Info) - 5/12 cols */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5 flex-1 flex flex-col">
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Resume (PDF)
                    </label>

                    {!resumeFile ? (
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`flex-1 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all min-h-[180px] ${
                          dragActive
                            ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/10'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-550/20 dark:bg-slate-950/10'
                        }`}
                      >
                        <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>

                        <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold mb-1 text-center">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-slate-450 dark:text-slate-500 text-center">
                          Maximum file size: 5MB
                        </p>

                        <label
                          htmlFor="resume"
                          className="cursor-pointer mt-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 transition-all active:scale-[0.98]"
                        >
                          Select PDF File
                        </label>
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf"
                          ref={resumeInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[180px]">
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/30 text-rose-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {resumeFile.name}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-550">
                              {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-500 transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0652dd] hover:bg-[#0048d0] text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-all active:scale-[0.98] cursor-pointer text-sm flex items-center space-x-2"
                >
                  <span>Generate Analysis</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Recent History Section */}
            <div className="w-full mt-12 pt-12 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-2xl">
                    Recent History
                  </h2>
                  <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm mt-1">
                    Access and review your previously generated preparation guides.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#0652dd] dark:text-blue-400 tracking-wider uppercase hover:underline cursor-pointer">
                  View All History
                </span>
              </div>

              {loading && !reports?.length ? (
                /* Loading Skeletons */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 animate-pulse">
                      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-16"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-20"></div>
                      </div>
                      <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-xl w-full pt-2"></div>
                    </div>
                  ))}
                </div>
              ) : !reports || reports.length === 0 ? (
                /* Empty State */
                <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-900/30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">No reports generated yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Upload your resume and the job description above to generate your first personalized interview prep guide.
                  </p>
                </div>
              ) : (
                /* Reports Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reports.slice(0, 6).map((item) => (
                    <div
                      key={item._id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:shadow-md dark:hover:shadow-none transition-all duration-300 group"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-450 line-clamp-2 leading-snug">
                            {item.title || "Job Interview Report"}
                          </h3>
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4 font-semibold uppercase tracking-wider">
                          Generated {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Score:</span>
                          <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                            item.matchScore >= 75
                              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/30'
                              : item.matchScore >= 50
                                ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-450 border border-amber-100 dark:border-amber-900/30'
                                : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-100 dark:border-rose-900/30'
                          }`}>
                            {item.matchScore}%
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/interview/${item._id}`)}
                          className="text-xs font-semibold bg-blue-50 dark:bg-slate-800 hover:bg-[#0652dd] dark:hover:bg-blue-650 text-blue-600 dark:text-slate-350 hover:text-white px-3.5 py-1.5 rounded-lg border border-blue-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-550 transition-all cursor-pointer flex items-center space-x-1"
                        >
                          <span>View</span>
                          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </main>

      {/* Bottom Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-500 mt-auto">
        <p>© {new Date().getFullYear()} Interview AI. Powered by Gemini. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;