import { GoogleGenAI } from "@google/genai";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";

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

const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content of the page to our generated HTML
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Generate PDF and save it to a file
  const pdfBuffer = await page.pdf({
    format:'A4'
  })
  await browser.close();

  return pdfBuffer;

}


async function generateResumePdf({resume,selfDescription,jobDescription}){
  
const resumePDFSchema = z.object({
  resumehtml:z.string().describe("The HTML content of the resume which can be converted to pdf using puppeteer")
})
const prompt = `Generate a resume for the following candidate based on their resume, self-description, and job description.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

the response should be json object with a single field resumehtml which contains the html content of the resume

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

const pdfBuffer = GeneratePDF(jsonContent.resumehtml)
return pdfBuffer

}


export default {generateInterviewReport,generateResumePdf};