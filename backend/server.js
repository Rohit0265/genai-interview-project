import 'dotenv/config';
import app from "./src/app.js";
import connection from "./src/config/database.js";
import generateInterviewReport from "./src/services/ai.services.js";
import { resume, selfDescription, jobDecription } from "./src/services/temp.js";


connection();

generateInterviewReport({resume,selfDescription,jobDecription});

app.listen(3000,()=>{
    console.log("app is running on port 3000");
});