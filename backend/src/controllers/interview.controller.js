
import {PDFParse} from "pdf-parse";
import  generateInterviewReport from "../services/ai.services.js";
import interviewReportModel from "../models/interview.model.js";


const createInterviewReport = async(req,res) => {
    const resumeFile = req.file
    const resumeContent = await PDFParse(req.file.buffer)
    const {selfDescription,jobDecription} = req.body
    const interviewReportByAI = await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDecription
    })
    const interviewReport = await interviewReportModel.create({
        resume:resumeContent,
        selfDescription,
        jobDecription,
        ...interviewReportByAI,
        // user:req.user.id
    })
    res.status(200).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}


export default createInterviewReport;