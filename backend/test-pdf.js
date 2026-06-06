import 'dotenv/config';
import connection from "./src/config/database.js";
import generateInterviewReport from "./src/services/ai.services.js";
import { resume, selfDescription, jobDescription } from "./src/services/temp.js";
import interviewReportModel from "./src/models/interview.model.js";

console.log("Connecting to database...");
await connection();

console.log("Calling generateInterviewReport...");
try {
  const result = await generateInterviewReport({ resume, selfDescription, jobDescription });
  console.log("Result generated from AI.");
  
  // Try saving to MongoDB using the exact fields returned by AI
  const saved = await interviewReportModel.create({
    user: "60c72b2f9b1d8b3d4c8b4567", // dummy ObjectId
    resume,
    selfDescription,
    jobDescription,
    ...result
  });
  console.log("Saved successfully:", saved._id);
} catch (err) {
  console.error("Error encountered:", err.message);
}
process.exit(0);
