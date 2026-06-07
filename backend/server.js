import 'dotenv/config';
import app from "./src/app.js";
import connection from "./src/config/database.js";
import generateInterviewReport from "./src/services/ai.services.js";
import { resume, selfDescription, jobDescription } from "./src/services/temp.js";


connection();

// generateInterviewReport({resume,selfDescription,jobDescription});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});