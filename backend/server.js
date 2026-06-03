import 'dotenv/config';
import app from "./src/app.js";
import connection from "./src/config/database.js";
import invoking from "./src/services/ai.services.js";

connection();

invoking();

app.listen(3000,()=>{
    console.log("app is running on port 3000");
});