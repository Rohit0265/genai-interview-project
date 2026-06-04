import express from "express";
import authuser from "../middlewares/auth.middleware.js";
import createInterviewReport from "../controllers/interview.controller.js";
import upload from "../middlewares/files.middleware.js"
const interviewRouter = express.Router();


/**
 * @route post /api/interview/create
 * @description create a new interview report on the basis of user self description ,job description and resume 
 * @access private
 * 
 */

interviewRouter.post('/',authuser,upload.single("resume"),createInterviewReport)

 


export default interviewRouter;