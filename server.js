import dotenv from "dotenv";
import app from "./src/app.js";
import connection from "./src/config/database.js";

dotenv.config();
connection();


app.listen(3000,()=>{
    console.log("app is running on port 3000")
})