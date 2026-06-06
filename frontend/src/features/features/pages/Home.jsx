import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../auth/hooks/hooks.auth'
import axios from 'axios'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
const Home = () => {
 


  const { user, handleLogout } = useAuth()
  const { loading, generateReport, reports, getAllReports } = useInterview()
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
        {isGenerating && (
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
        {!isGenerating &&  (
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
                      ref={resumeInputRef}
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

        {/* Past Reports Section */}
        {!isGenerating && (
          <div className="max-w-6xl mx-auto w-full mt-12 pt-12 border-t border-slate-900/60">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight sm:text-2xl bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                  Your Saved Reports
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Access and review your previously generated preparation guides.
                </p>
              </div>
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full border border-indigo-500/20">
                {reports?.length || 0} {reports?.length === 1 ? 'Report' : 'Reports'}
              </span>
            </div>

            {loading && !reports?.length ? (
              /* Loading Skeletons */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-6 bg-slate-800 rounded w-16"></div>
                      <div className="h-3 bg-slate-800 rounded w-20"></div>
                    </div>
                    <div className="h-8 bg-slate-800 rounded-xl w-full pt-2"></div>
                  </div>
                ))}
              </div>
            ) : !reports || reports.length === 0 ? (
              /* Empty State */
              <div className="bg-slate-900/20 border border-dashed border-slate-850 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-200">No reports generated yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Upload your resume and the job description above to generate your first personalized interview prep guide.
                </p>
              </div>
            ) : (
              /* Reports Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 group shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <h3 className="text-sm font-semibold text-slate-100 group-hover:text-white line-clamp-2 leading-snug">
                          {item.title || "Job Interview Report"}
                        </h3>
                      </div>
                      <p className="text-[10px] text-slate-500 mb-4 font-medium uppercase tracking-wider">
                        Generated {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-950">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-sans">Score:</span>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                          item.matchScore >= 75 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : item.matchScore >= 50 
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {item.matchScore}%
                        </span>
                      </div>
                      <button
                        onClick={() => navigate(`/interview/${item._id}`)}
                        className="text-xs font-semibold bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white px-3.5 py-1.5 rounded-xl border border-indigo-500/20 hover:border-indigo-500 transition-all cursor-pointer flex items-center space-x-1"
                      >
                        <span>View</span>
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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