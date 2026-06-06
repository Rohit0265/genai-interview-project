import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useInterview } from '../hooks/useInterview'


const Interview = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('technical') // 'technical', 'behavioral', 'roadmap'
  
  
  
  const params = new URLSearchParams(window.location.search)
  
  const { interviewId } = useParams()


  const { report, getReportById, loading, getResumePdf } = useInterview()

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [downloading, setDownloading] = useState(false)

  const handleDownloadResume = async () => {
    try {
      setDownloading(true)
      await getResumePdf(interviewId)
    } catch (err) {
      console.error(err)
      alert("Failed to generate and download resume PDF. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId, getReportById])

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 animate-spin"></div>
          <p className="text-slate-400 text-sm">Loading interview report...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-10 flex flex-col justify-between antialiased">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-all bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-500 font-medium">Match Score:</span>
          <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
            {report.matchScore}%
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-800 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
        
        {/* Left Sidebar (3/12 width) */}
        <div className="lg:col-span-3 border-r border-slate-800 p-6 flex flex-col justify-start space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Assessment Sections
          </div>
          
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setActiveTab('technical')
                setExpandedIndex(null)
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'technical'
                  ? 'bg-slate-900 text-white border-l-4 border-indigo-500 pl-3'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              Technical questions
            </button>
            <button
              onClick={() => {
                setActiveTab('behavioral')
                setExpandedIndex(null)
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'behavioral'
                  ? 'bg-slate-900 text-white border-l-4 border-indigo-500 pl-3'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              Behavioral questions
            </button>
            <button
              onClick={() => {
                setActiveTab('roadmap')
                setExpandedIndex(null)
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-slate-900 text-white border-l-4 border-indigo-500 pl-3'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              Road Map
            </button>
          </nav>

          {/* Download Resume Section */}
          <div className="mt-auto pt-6 border-t border-slate-900 flex flex-col space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              Export Resume
            </div>
            <button
              onClick={handleDownloadResume}
              disabled={downloading}
              className="w-full flex items-center justify-center space-x-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all px-4 py-3 rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer border border-indigo-500/20 active:scale-[0.98]"
            >
              {downloading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Resume PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Middle Main Content Area (6/12 width) */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col min-h-[500px] border-r border-slate-800">
          
          {/* TAB: Technical Questions */}
          {activeTab === 'technical' && (
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="text-xl font-bold text-white">Technical practice</h2>
                <p className="text-xs text-slate-500 mt-1">Practice these core technical concepts customized for the job description.</p>
              </div>

              <div className="space-y-4">
                {report.technicalQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="w-full p-4 flex items-start justify-between text-left cursor-pointer hover:bg-slate-900/70"
                    >
                      <div className="pr-4">
                        <span className="text-xs font-bold text-slate-500 mr-2">Q{idx + 1}.</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-200">{q.question}</span>
                      </div>
                      <span className="shrink-0 mt-0.5 text-slate-400">
                        {expandedIndex === idx ? (
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

                    {expandedIndex === idx && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-900 bg-slate-950/40 space-y-3.5 text-xs sm:text-sm">
                        <div>
                          <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-400 mb-1.5">
                            Intention
                          </h5>
                          <p className="text-slate-400 leading-relaxed">{q.intention}</p>
                        </div>
                        <div>
                          <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400 mb-1.5">
                            Sample Answer
                          </h5>
                          <p className="text-slate-300 leading-relaxed whitespace-pre-line">{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Behavioral Questions */}
          {activeTab === 'behavioral' && (
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="text-xl font-bold text-white">Behavioral practice</h2>
                <p className="text-xs text-slate-500 mt-1">Structured questions to evaluate collaboration, conflict resolution, and growth.</p>
              </div>

              <div className="space-y-4">
                {report.behavioralQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="w-full p-4 flex items-start justify-between text-left cursor-pointer hover:bg-slate-900/70"
                    >
                      <div className="pr-4">
                        <span className="text-xs font-bold text-slate-500 mr-2">Q{idx + 1}.</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-200">{q.question}</span>
                      </div>
                      <span className="shrink-0 mt-0.5 text-slate-400">
                        {expandedIndex === idx ? (
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

                    {expandedIndex === idx && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-900 bg-slate-950/40 space-y-3.5 text-xs sm:text-sm">
                        <div>
                          <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-400 mb-1.5">
                            Intention
                          </h5>
                          <p className="text-slate-400 leading-relaxed">{q.intention}</p>
                        </div>
                        <div>
                          <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400 mb-1.5">
                            Sample STAR Answer
                          </h5>
                          <p className="text-slate-300 leading-relaxed whitespace-pre-line">{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Road Map */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="text-xl font-bold text-white">Preparation Road Map</h2>
                <p className="text-xs text-slate-500 mt-1">A step-by-step custom training roadmap tailored to bridge any candidate gaps.</p>
              </div>

              <div className="relative border-l border-slate-800 ml-4 pl-6 space-y-8 mt-4">
                {report.preparationPlan.map((plan, index) => (
                  <div key={index} className="relative">
                    {/* Day Marker Dot */}
                    <div className="absolute -left-[37px] top-0.5 bg-indigo-600 border border-slate-950 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shadow-lg">
                      D{plan.day}
                    </div>
                    
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        Day {plan.day}: <span className="text-indigo-400">{plan.focus}</span>
                      </h4>
                      
                      {plan.task && plan.task.length > 0 ? (
                        <ul className="mt-3 space-y-2">
                          {plan.task.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-start space-x-2.5 text-xs text-slate-400">
                              <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="leading-relaxed">{t}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-600 text-[11px] mt-1.5 italic">No specific tasks allocated.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar (3/12 width) */}
        <div className="lg:col-span-3 p-6 flex flex-col space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Skill Gaps
          </div>

          <div className="flex flex-wrap gap-2.5">
            {report.skillgaps.map((skill, index) => (
              <span
                key={index}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center text-[10px] text-slate-600 mt-6 max-w-6xl mx-auto w-full">
        Interview AI • Layout Mockup
      </footer>
    </div>
  )
}

export default Interview