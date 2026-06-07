import { GoogleGenAI } from "@google/genai";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";
import puppeteer from "puppeteer";

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
});

async function invoking() {
    console.log("API KEY:", process.env.GOOGLE_API_KEY);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

const interviewReportSchema = z.object({

matchScore:z.number().describe("A score between 0 and 100 how well the candidate matches the job describe"),



  technicalQuestions:z.array(z.object({
    question:z.string().describe("The technical question can be asked in the interview"),
    intention:z.string().describe("The intention of interviewer behind asking this question"),
    answer:z.string().describe("THow to answer this question, what points to cover,what approach to take etc.")
  })).describe("Technical questions that can be asked in the interview along with their interntion"),

  behavioralQuestions:z.array(z.object({
    question:z.string().describe("The behavioral question can be asked in the interview"),
    intention:z.string().describe("The intention of interviewer behind asking this question"),
    answer:z.string().describe("THow to answer this question, what points to cover,what approach to take etc.")
  })).describe("behavioral questions that can be asked in the interview along with their interntion"),


    skillGaps:z.array(z.object({
      skill:z.string().describe("The skill which the candidate is lacking"),
      severity:z.enum(["high",'medium','low']).describe("The severity of this skills gaps that the candidate is lacking")
    })).describe("skillGaps are the skills which the candidate is lacking"),

    
    preparationPlan:z.array(z.object({
     day:z.string().describe("The day number in the preparation plan,starting from 1"),
     focus:z.string().describe("THe main focus of this day in the preparatoion plan, e.g. read a specific book or topic"),
     tasks:z.array(z.string().describe("The task to be performed on this day,e.g. solve specific problems from the book or topic")).describe("tasks that should be performed on this day")
     })).describe("The preparation plan for the candidate, which is a list of days and the tasks to be performed on each day"),
     title:z.string().describe("The title of the job for which the interview is being conducted"),
     

})

async function generateInterviewReport({resume,selfDescription,jobDescription}){
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `
    Generate an interview report for the following candidate based on their resume, self-description, and job description.
    
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
    
    Please generate the interview report in the following format:
    
    Interview Report:
    - Match Score: (score between 0 and 100)
    - Technical Questions: (list of technical questions)
    - Behavioral Questions: (list of behavioral questions)
    - Skill Gaps: (list of skill gaps)
    - Preparation Plan: (list of preparation tasks)
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportSchema.toJSONSchema(),
    },
  });
  return JSON.parse(response.text)
}



async function GeneratePDF(htmlContent){

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set the content of the page to our generated HTML
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Generate PDF and save it to a file
  const pdfBuffer = await page.pdf({
    format:'A4',
    margin:{
      top:'20mm',
      bottom:'20mm',
      left:'20mm',
      right:'20mm'
    }
  })
  await browser.close();

  return pdfBuffer;

}


async function generateResumePdf({resume,selfDescription,jobDescription}){
  
const resumePDFSchema = z.object({
  resumehtml:z.string().describe("The HTML content of the resume which can be converted to pdf using puppeteer")
})
const prompt = `Act as a world-class executive resume writer, ATS optimization specialist, hiring manager, recruiter, and career coach with extensive experience across multiple industries including technology, finance, healthcare, consulting, marketing, sales, operations, education, engineering, government, and management.

Use THe jake resume template from overleaf and make it

Your task is to create a highly professional, ATS-friendly, recruiter-optimized resume that maximizes interview opportunities while maintaining accuracy and credibility.

========================
CANDIDATE INFORMATION
========================

Name:
[Insert Name]

Phone:
[Insert Phone Number]

Email:
[Insert Email Address]

Location:
[Insert Location]

LinkedIn:
[Insert LinkedIn URL]

Portfolio/Website:
[Insert Portfolio URL]

GitHub (if applicable):
[Insert GitHub URL]

Target Position:
[Insert Target Role]

Industry:
[Insert Industry]

Years of Experience:
[Insert Experience Level]

========================
PROFESSIONAL SUMMARY
========================

Create a compelling professional summary that:

• Is 3–5 lines long
• Highlights the candidate’s most relevant strengths
• Demonstrates value and expertise
• Includes industry-specific keywords
• Aligns with the target role
• Is ATS-friendly
• Avoids generic buzzwords and clichés

========================
CORE COMPETENCIES
========================

Analyze the candidate information and generate a well-structured skills section grouped into relevant categories such as:

• Technical Skills
• Software & Tools
• Leadership Skills
• Business Skills
• Industry Expertise
• Analytical Skills
• Communication Skills
• Project Management Skills
• Operational Skills

Only include skills relevant to the target role.

========================
WORK EXPERIENCE
========================

For each role, rewrite and enhance the provided information using professional resume standards.

Input Format:

Company:
Position:
Duration:
Responsibilities:
Achievements:

Requirements:

• Use strong action verbs
• Focus on accomplishments rather than duties
• Quantify results whenever possible
• Highlight measurable business impact
• Demonstrate leadership, ownership, and initiative
• Show progression and growth
• Use ATS-friendly language
• Maintain professional tone

Examples of measurable outcomes:

• Revenue growth
• Cost reduction
• Process improvement
• Productivity increase
• Customer satisfaction improvement
• Risk reduction
• Time savings
• Team leadership impact

========================
PROJECTS
========================

For each project provided:

Project Name:
Duration:
Technologies/Tools Used:
Description:

Generate:

• Professional project overview
• Key contributions
• Technical/business implementation
• Challenges solved
• Outcomes achieved
• ATS keywords relevant to the target role

Projects should be described in achievement-oriented language.

========================
EDUCATION
========================

Format education professionally.

Include:

• Degree
• Institution
• Graduation Date
• GPA/CGPA (if provided)
• Honors/Awards (if provided)

========================
CERTIFICATIONS
========================

Create a professional certifications section.

For each certification include:

• Certification Name
• Issuing Organization
• Completion Date

Arrange certifications by relevance.

========================
ACHIEVEMENTS & AWARDS
========================

Create a separate section for:

• Awards
• Recognition
• Scholarships
• Competitions
• Publications
• Patents
• Professional accomplishments

Present them in a concise and impactful format.

========================
LEADERSHIP & VOLUNTEER EXPERIENCE
========================

If information is provided, highlight:

• Leadership experience
• Team management
• Community involvement
• Volunteer work
• Mentorship

Focus on impact and transferable skills.

========================
ATS OPTIMIZATION
========================

Ensure the resume:

• Achieves an estimated ATS score of 90+ when possible
• Contains relevant industry keywords
• Uses standard section headings
• Avoids graphics, tables, icons, and ATS-unfriendly formatting
• Uses recruiter-friendly language
• Includes role-specific terminology
• Is optimized for both ATS systems and human reviewers

========================
RECRUITER REVIEW
========================

After generating the resume, provide:

1. ATS Score Estimate
2. Strengths of the Resume
3. Potential Weaknesses
4. Missing Keywords
5. Improvement Suggestions
6. Recruiter Feedback
7. Hiring Probability Assessment
8. Industry Competitiveness Analysis

========================
FINAL OUTPUT REQUIREMENTS
========================

Produce:

1. Complete ATS-Optimized Resume
2. Executive-Level Professional Formatting
3. Recruiter Review Report
4. ATS Analysis Report
5. Recommendations for Further Improvement

The final resume should be polished, modern, achievement-focused, industry-aligned, and ready for immediate submission to employers..

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

the response should be json object with a single field resumehtml which contains the html content of the resume.
make the resume ats friendly and professional, keep it in a single page, do not use much styling. make it look modern, with professional font.
`

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseSchema: zodToJsonSchema(resumePDFSchema),
  },
})
const jsonContent = JSON.parse(response.text)

const pdfBuffer = await GeneratePDF(jsonContent.resumehtml)
return pdfBuffer

}


export { generateInterviewReport, generateResumePdf };
export default generateInterviewReport;