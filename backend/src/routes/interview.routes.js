import express from "express";
import authuser from "../middlewares/auth.middleware.js";
// import {createInterviewReport,getInterviewReport,getAllInterviewReport} from "./controllers/interview.controller.js"

import {createInterviewReport,getInterviewReport,getAllInterviewReport, generateResumePdf} from "../controllers/interview.controller.js"



import upload from "../middlewares/files.middleware.js"
const interviewRouter = express.Router();


/**
 * @route post /api/interview/create
 * @description create a new interview report on the basis of user self description ,job description and resume 
 * @access private
 * 
 */

interviewRouter.post('/generate',authuser,upload.single("resumeFile"),createInterviewReport)

/**
 * @route get /api/interview/report/:interviewId
 * @description get a interview report
 * @access private
 * 
 */

interviewRouter.get('/report/:interviewId',authuser,getInterviewReport)
 


/**
 * @route get /api/interview/
 * @description hget all interview reports of logges in user
 * @access private
 */

interviewRouter.get('/',authuser,getAllInterviewReport)


/**
 * @route get /api/interview/report/:interviewId/pdf
 * @description generate and download resume pdf
 * @access private
 */

interviewRouter.post('/report/:interviewId',authuser,generateResumePdf)



export default interviewRouter;