import 'dotenv/config';
import app from "./src/app.js";
import connection from "./src/config/database.js";
import generateInterviewReport from "./src/services/ai.services.js";
import { resume, selfDescription, jobDescription } from "./src/services/temp.js";


connection();

generateInterviewReport({resume,selfDescription,jobDescription});

app.listen(3000,()=>{
    console.log("app is running on port 3000");
});