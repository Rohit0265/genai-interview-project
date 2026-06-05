import React, { useState } from 'react'
import { useNavigate } from 'react-router'

// Mock data directly from the user's request
const MOCK_REPORT = {
  "_id": {
    "$oid": "6a21186d1fd666f83caa1743"
  },
  "jobDescription": "Position: Full Stack Developer (Node.js & React) Location: Remote / Hybrid Experience Level: Mid-Level (3+ years)  Job Summary: We are looking for a skilled Full Stack Developer to join our growing engineering team. In this role, you will be responsible for developing and maintaining both frontend components and backend services for our SaaS platform. You will collaborate with product managers, designers, and other engineers to deliver high-quality features that delight our users.  Key Responsibilities: - Design, build, and maintain efficient, reusable, and reliable JavaScript code. - Develop user-facing features using React.js and state management tools. - Build and optimize RESTful API services using Node.js and Express. - Work with MongoDB for schema design, data modeling, and performance tuning. - Identify bottlenecks and bugs, and devise solutions to these problems. - Help maintain code quality, organization, and automatization through testing.  Requirements: - 3+ years of professional software development experience. - Strong proficiency in JavaScript (ES6+) and modern web standards. - Deep knowledge of React.js, React Hooks, and common state management libraries. - Hands-on experience building backend APIs with Node.js and Express.js. - Solid experience working with NoSQL databases, specifically MongoDB. - Familiarity with version control systems (Git) and CI/CD pipelines. - Excellent communication and teamwork skills.",
  "resume": "Rohit Mathur\n +91 9582704516 # rohitmathur05458@gmail.com + Ghaziabad, UP\nï LinkedIn § GitHub Ð LeetCode\nSummary\nFull-stack software developer and CS undergrad at KIET with hands-on experience building REST APIs, microservices,\nand responsive web applications using React, Node.js, TypeScript, and Docker. Seeking software development internships\nto contribute to scalable, production-ready systems.\nEducation\nKIET Group of Institutions Ghaziabad, Uttar Pradesh\nB.Tech in Computer Science 2023 – Present\nProjects\nVulnTest – Web Vulnerability Scanner 2 | Node.js, REST APIs, Security Testing Feb 2026 – Present\n• Engineered a web vulnerability scanner detecting XSS, SQL Injection, and Path Traversal across live web targets.\n• Curated a payload library of 1500+ fuzzing and injection strings for automated testing across multiple endpoint\ntypes.\n• Built a Node.js/Express backend that automates end-to-end security scans with concurrent request handling,\nreducing scan time significantly.\n• Reduced false positives through pattern-based validation and HTTP response filtering.\n• Implemented a modular scan engine supporting extensible payload categories and configurable attack depth per\nendpoint.\nFull-Stack E-Commerce Application 2 | Node.js, React, Microservices, Docker Dec 2025 – Feb 2026\n• Decomposed a monolithic design into 4 independent microservices (auth, catalog, orders, payments), enabling\nindependent deployment.\n• Delivered 15+ RESTful API endpoints using Node.js/Express, covering full CRUD operations across all services.\n• Containerized all 4 services with Docker, cutting environment setup time from hours to under 5 minutes.\n• Crafted a React frontend handling cart, checkout, and product browsing flows with event-driven data consistency.\n• Integrated Clerk for authentication and role-based access control across microservices, securing inter-service API\ncommunication.\nEdemy – Online Learning Platform 2 | React, Tailwind CSS, Node.js, Clerk Oct 2025 – Dec 2025\n• Built a full-stack LMS with course browsing, enrollment, and progress tracking.\n• Integrated Clerk for authentication and JWT-based user session management.\n• Shipped 12 backend API endpoints with Node.js to manage course content, user records, and progress state.\n• Built a mobile-responsive UI using React and Tailwind CSS with lazy loading and optimized component re-renders.\nTechnical Skills\nLanguages: Python, C/C++, SQL, TypeScript, JavaScript, HTML/CSS\nFrameworks: React, Node.js, Express, FastAPI\nDeveloper Tools: Redis, Prisma, PostgreSQL, Zod, Git, Docker, Google Cloud Platform, VS Code\nCoursework: OOP, Computer Networks, DBMS, Operating Systems\nCertifications\nCisco Certified Network Associate – Cisco Apr 2026\nAWS Certified Cloud Practitioner – Amazon Web Services Dec 2025\nDatabase Programming with SQL – Oracle Academy Nov 2024\nAchievements\n• Built a vulnerability scanner detecting 3+ critical OWASP vulnerabilities with 90%+ detection accuracy.\n• Solved 400+ DSA problems across LeetCode, Codeforces, and GFG; ranked in top 20% on LeetCode.\n• Completed 50+ hands-on labs on PortSwigger Web Security Academy covering SQLi, XSS, SSRF, and CSRF.\n\n-- 1 of 1 --\n\n",
  "selfDescription": "I am a self-motivated software engineer who loves solving complex algorithmic problems and building elegant user experiences. Over the past three years, I have focused heavily on mastering the JavaScript ecosystem. I take pride in writing clean, maintainable code and always strive to follow industry best practices like DRY and SOLID principles.   In my day-to-day work, I am highly collaborative. I enjoy participating in code reviews, sharing knowledge with team members, and brainstorming technical solutions together. While my primary expertise lies in frontend development with React, I am also very comfortable building backend services with Node.js and managing databases.   I am currently looking for a role where I can contribute to meaningful projects, expand my full-stack capabilities, and work alongside a team of experienced developers. I am a quick learner and am eager to adapt to new stacks or methodologies as required by the projects.",
  "matchScore": 75,
  "technicalQuestions": [
    {
      "question": "Can you explain the difference between REST and GraphQL and when you might choose one over the other?",
      "intention": "To assess the candidate's understanding of API design principles and their ability to choose appropriate technologies for different scenarios.",
      "answer": "REST is an architectural style that uses standard HTTP methods (GET, POST, PUT, DELETE) and is stateless. It's generally simpler to implement and widely understood. GraphQL is a query language for APIs that allows clients to request exactly the data they need. This can lead to more efficient data fetching and fewer requests, especially for complex data structures. I'd choose REST for simpler APIs or when leveraging existing HTTP infrastructure is beneficial. GraphQL is preferable for applications with complex data relationships, mobile clients where bandwidth is a concern, or when clients need flexible data retrieval."
    },
    {
      "question": "Describe a situation where you had to optimize the performance of a Node.js application. What steps did you take and what was the outcome?",
      "intention": "To evaluate the candidate's practical experience in performance tuning backend services and their problem-solving approach.",
      "answer": "In my Full-Stack E-Commerce Application project, the order processing service was becoming slow under load. I used Node.js's built-in profiling tools and later implemented Redis for caching frequently accessed product data. I also optimized database queries by adding appropriate indexes to the PostgreSQL database. Additionally, I refactored some synchronous operations to be asynchronous using `async/await` to prevent blocking the event loop. The outcome was a 30% reduction in average response time for order-related requests and improved scalability."
    },
    {
      "question": "How do you handle state management in a large React application? Can you compare different approaches like Context API, Redux, or Zustand?",
      "intention": "To understand the candidate's knowledge of React state management patterns and their ability to choose the right tool for the job.",
      "answer": "For simpler global state needs, React's Context API with `useReducer` can be sufficient. For more complex applications with frequent updates and middleware requirements, Redux or Zustand are strong choices. Redux offers a robust ecosystem and strict patterns, which can be good for large teams, but can also be boilerplate-heavy. Zustand is lighter-weight, has less boilerplate, and is often easier to get started with while still providing powerful features for managing global state efficiently. The choice depends on the application's complexity, team familiarity, and performance requirements."
    },
    {
      "question": "Explain the concept of microservices and its benefits and drawbacks compared to a monolithic architecture. How did you apply this in your E-commerce project?",
      "intention": "To gauge the candidate's understanding of software architecture patterns, particularly microservices, and their practical application.",
      "answer": "Microservices break down an application into smaller, independent services that communicate over a network. Benefits include independent scaling, deployment, and technology choices, leading to increased agility and resilience. Drawbacks include increased operational complexity, distributed system challenges (like network latency and data consistency), and the need for robust inter-service communication. In my e-commerce project, I decomposed the monolith into four microservices (auth, catalog, orders, payments) using Node.js/Express and Docker. This allowed each service to be developed and deployed independently, improving development velocity and maintainability."
    },
    {
      "question": "What are some common web security vulnerabilities, and how do you prevent them in your code? Referencing your VulnTest project.",
      "intention": "To assess the candidate's awareness of security best practices and their experience in building secure applications.",
      "answer": "Common vulnerabilities include Cross-Site Scripting (XSS), SQL Injection, and Cross-Site Request Forgery (CSRF). To prevent XSS, I use output encoding libraries and sanitize user inputs before rendering them in the UI. For SQL Injection, I use parameterized queries or ORMs like Prisma which handle escaping automatically, avoiding string concatenation for queries. My VulnTest project was specifically designed to detect these, so I implemented robust input validation, used prepared statements for database interactions, and ensured secure handling of user sessions and authentication tokens. Additionally, validating and sanitizing data received from external sources is crucial."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Describe a challenging project you worked on and how you overcame the obstacles. What did you learn from the experience?",
      "intention": "To understand the candidate's problem-solving skills, resilience, and ability to learn from difficult situations.",
      "answer": "The VulnTest project presented challenges in accurately detecting and differentiating various vulnerabilities, especially minimizing false positives. We initially had a high rate of false positives for SQL Injection. To overcome this, I spent significant time curating a more diverse and specific payload library, refined the response parsing logic to better identify patterns indicative of successful injection, and implemented a confidence scoring mechanism. This taught me the importance of iterative refinement, meticulous data analysis, and the nuances of security testing."
    },
    {
      "question": "Tell me about a time you had a disagreement with a team member or manager about a technical approach. How did you handle it?",
      "intention": "To assess the candidate's conflict resolution skills, communication style, and ability to collaborate effectively.",
      "answer": "In a previous group project, there was a debate about using React Context API versus Redux for state management. I initially favored Context for its simplicity, while a teammate advocated for Redux due to its perceived scalability. We scheduled a meeting where I presented the pros and cons of each based on our project's specific needs, highlighting the boilerplate overhead of Redux for our current scope. My teammate then shared concerns about future complexity that Redux might handle better. We eventually agreed on a hybrid approach, using Context for simpler global states and considering Redux if the complexity grew significantly, which fostered a collaborative resolution."
    },
    {
      "question": "How do you stay updated with the latest technologies and trends in software development?",
      "intention": "To gauge the candidate's proactiveness in continuous learning and their passion for the field.",
      "answer": "I actively follow tech blogs like Smashing Magazine and CSS-Tricks, subscribe to newsletters from prominent figures in the JavaScript community, and regularly check GitHub trending repositories. I also engage with developers on platforms like Twitter and Dev.to. Additionally, I dedicate time to experimenting with new libraries or frameworks through personal projects and completing hands-on labs or online courses when I encounter a new technology relevant to my interests or career goals. Participating in code reviews and discussing new approaches with peers also helps me stay current."
    },
    {
      "question": "Describe your experience with code reviews. What do you look for when reviewing someone else's code, and how do you incorporate feedback on your own code?",
      "intention": "To evaluate the candidate's understanding of collaborative development practices and their ability to give and receive constructive criticism.",
      "answer": "I view code reviews as a crucial part of the development process for improving code quality and knowledge sharing. When reviewing, I look for clarity, maintainability, adherence to coding standards, potential bugs, performance bottlenecks, and security vulnerabilities. I also ensure the code meets the requirements and aligns with architectural decisions. When my code is reviewed, I approach feedback with an open mind, seeking to understand the reviewer's perspective. I ask clarifying questions if needed and am always willing to make improvements based on constructive criticism, seeing it as an opportunity to learn and grow."
    }
  ],
  "preparationPlan": [
    {
      "day": "1",
      "focus": "MongoDB Fundamentals",
      "task": ["Study database modeling and indexing", "Understand aggregation pipelines", "Practice writing basic queries"],
      "_id": {
        "$oid": "6a21186d1fd666f83caa1744"
      }
    },
    {
      "day": "2",
      "focus": "Node.js & Express with MongoDB Integration",
      "task": ["Build REST endpoints using Express router", "Hook up mongoose controllers to endpoints", "Implement middleware validation"],
      "_id": {
        "$oid": "6a21186d1fd666f83caa1745"
      }
    },
    {
      "day": "3",
      "focus": "React State Management & Performance",
      "task": ["Implement React hooks (useMemo, useCallback)", "Configure global state context APIs", "Profile component renders via React devtools"],
      "_id": {
        "$oid": "6a21186d1fd666f83caa1746"
      }
    },
    {
      "day": "4",
      "focus": "CI/CD Concepts & Application",
      "task": ["Draft github actions workflow configuration", "Dockerize React static application file builds", "Verify container routing limits"],
      "_id": {
        "$oid": "6a21186d1fd666f83caa1747"
      }
    },
    {
      "day": "5",
      "focus": "Bridging Experience Gap & Behavioral Practice",
      "task": ["Practice STAR response formats out loud", "Refine examples of team conflict resolution", "Conduct self mock run of behavioral questions"],
      "_id": {
        "$oid": "6a21186d1fd666f83caa1748"
      }
    }
  ],
  "skillgaps": ["redis", "Message queue", "Event loop"],
  "createdAt": {
    "$date": "2026-06-04T06:17:17.920Z"
  },
  "updatedAt": {
    "$date": "2026-06-04T06:17:17.920Z"
  },
  "__v": 0
}

const Interview = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('technical') // 'technical', 'behavioral', 'roadmap'
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
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
            {MOCK_REPORT.matchScore}%
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
                {MOCK_REPORT.technicalQuestions.map((q, idx) => (
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
                {MOCK_REPORT.behavioralQuestions.map((q, idx) => (
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
                {MOCK_REPORT.preparationPlan.map((plan, index) => (
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
            {MOCK_REPORT.skillgaps.map((skill, index) => (
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