import { GoogleGenAI } from "@google/genai";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
});

async function invoking() {
    console.log("API KEY:", process.env.GOOGLE_API_KEY);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
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

})

async function generateInterviewReport({resume,selfDescription,jobDecription}){
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
    Generate an interview report for the following candidate based on their resume, self-description, and job description.
    
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDecription}
    
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

export default generateInterviewReport;