import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useInterview } from '../hooks/useInterview'
import { useTheme } from '../../theme.context'
import Loading from '../../../components/Loading'

const Interview = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('technical') // 'technical', 'behavioral', 'roadmap'
  const { theme, toggleTheme } = useTheme()
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

  if (loading || !report) {
    return <Loading variant="full-screen" message="Loading interview report..." description="Fetching your analysis results and preparation plan." />
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 font-sans p-6 sm:p-10 flex flex-col justify-between antialiased">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white transition-all bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </button>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-full hover:bg-white dark:hover:bg-slate-850 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Match Score:</span>
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/30 rounded-lg">
              {report?.matchScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm dark:shadow-none">
        
        {/* Left Sidebar (3/12 width) */}
        <div className="lg:col-span-3 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-start space-y-6 bg-slate-50/50 dark:bg-slate-950/30">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Assessment Sections
          </div>
          
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => {
                setActiveTab('technical')
                setExpandedIndex(null)
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'technical'
                  ? 'bg-white dark:bg-slate-950 text-[#0652dd] dark:text-blue-400 border-l-4 border-[#0652dd] pl-3 shadow-sm border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-600 dark:text-slate-450 hover:text-slate-900 dark:hover:text-slate-250 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Technical questions
            </button>
            <button
              onClick={() => {
                setActiveTab('behavioral')
                setExpandedIndex(null)
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'behavioral'
                  ? 'bg-white dark:bg-slate-950 text-[#0652dd] dark:text-blue-400 border-l-4 border-[#0652dd] pl-3 shadow-sm border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-600 dark:text-slate-450 hover:text-slate-900 dark:hover:text-slate-250 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Behavioral questions
            </button>
            <button
              onClick={() => {
                setActiveTab('roadmap')
                setExpandedIndex(null)
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-white dark:bg-slate-950 text-[#0652dd] dark:text-blue-400 border-l-4 border-[#0652dd] pl-3 shadow-sm border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-600 dark:text-slate-450 hover:text-slate-900 dark:hover:text-slate-250 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Road Map
            </button>
          </nav>

          {/* Download Resume Section */}
          <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-850 flex flex-col space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-550">
              Export Resume
            </div>
            <button
              onClick={handleDownloadResume}
              disabled={downloading}
              className="w-full flex items-center justify-center space-x-2 text-xs font-semibold text-white bg-[#0652dd] dark:bg-blue-600 hover:bg-[#0048d0] dark:hover:bg-blue-550 disabled:opacity-50 transition-all px-4 py-3 rounded-xl shadow-sm cursor-pointer border border-[#0652dd] dark:border-blue-600 active:scale-[0.98]"
            >
              {downloading ? (
                <Loading variant="inline" message="Generating PDF..." />
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
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col min-h-[500px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          
          {/* TAB: Technical Questions */}
          {activeTab === 'technical' && (
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Technical practice</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Practice these core technical concepts customized for the job description.</p>
              </div>

              <div className="space-y-4">
                {report?.technicalQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-50/30 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="w-full p-4 flex items-start justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850/50"
                    >
                      <div className="pr-4">
                        <span className="text-xs font-bold text-slate-400 mr-2">Q{idx + 1}.</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-305">{q.question}</span>
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
                      <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-850 bg-[#fbfcfd] dark:bg-slate-950/40 space-y-3.5 text-xs sm:text-sm">
                        <div className="mt-3">
                          <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400 mb-1.5">
                            Intention
                          </h5>
                          <p className="text-slate-605 dark:text-slate-400 leading-relaxed">{q.intention}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-450 mb-1.5">
                            Sample Answer
                          </h5>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-lg">{q.answer}</p>
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
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Behavioral practice</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Structured questions to evaluate collaboration, conflict resolution, and growth.</p>
              </div>

              <div className="space-y-4">
                {report.behavioralQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-50/30 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="w-full p-4 flex items-start justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850/50"
                    >
                      <div className="pr-4">
                        <span className="text-xs font-bold text-slate-400 mr-2">Q{idx + 1}.</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-305">{q.question}</span>
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
                      <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-850 bg-[#fbfcfd] dark:bg-slate-950/40 space-y-3.5 text-xs sm:text-sm">
                        <div className="mt-3">
                          <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400 mb-1.5">
                            Intention
                          </h5>
                          <p className="text-slate-605 dark:text-slate-400 leading-relaxed">{q.intention}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-450 mb-1.5">
                            Sample STAR Answer
                          </h5>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-lg">{q.answer}</p>
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
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Preparation Road Map</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">A step-by-step custom training roadmap tailored to bridge any candidate gaps.</p>
              </div>

              <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-8 mt-6">
                {report.preparationPlan.map((plan, index) => (
                  <div key={index} className="relative">
                    {/* Day Marker Dot */}
                    <div className="absolute -left-[37px] top-0.5 bg-[#0652dd] dark:bg-blue-600 border border-white dark:border-slate-900 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shadow-sm">
                      D{plan.day}
                    </div>
                    
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-250">
                        Day {plan.day}: <span className="text-blue-600 dark:text-blue-400 font-semibold">{plan.focus}</span>
                      </h4>
                      
                      {(() => {
                        const tasksList = plan.task || plan.tasks;
                        return tasksList && tasksList.length > 0 ? (
                          <ul className="mt-3 space-y-2">
                            {tasksList.map((t, tIdx) => (
                              <li key={tIdx} className="flex items-start space-x-2.5 text-xs text-slate-650 dark:text-slate-400">
                                <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="leading-relaxed">{t}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-slate-400 dark:text-slate-550 text-[11px] mt-1.5 italic">No specific tasks allocated.</p>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar (3/12 width) */}
        <div className="lg:col-span-3 p-6 flex flex-col space-y-6 bg-slate-50/50 dark:bg-slate-950/30">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Skill Gaps
          </div>

          <div className="flex flex-wrap gap-2">
            {(report?.skillgaps || report?.skillGaps || [])?.map((skill, index) => {
              const skillName = typeof skill === 'object' ? skill.skill : skill;
              const severity = typeof skill === 'object' ? skill.severity : null;
              return (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-755 transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <span>{skillName}</span>
                  {severity && (
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      severity === 'high' ? 'bg-rose-500' : severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} title={`Severity: ${severity}`} />
                  )}
                </span>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center text-[10px] text-slate-450 dark:text-slate-550 mt-6 max-w-6xl mx-auto w-full">
        PrepAI • Layout Mockup
      </footer>
    </div>
  )
}

export default Interview