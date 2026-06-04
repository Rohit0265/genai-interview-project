
import {PDFParse} from "pdf-parse";
import  generateInterviewReport from "../services/ai.services.js";
import interviewReportModel from "../models/interview.model.js";


const createInterviewReport = async(req,res) => {
    const resumeFile = req.file
    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDecription} = req.body
    const interviewReportByAI = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDecription
    })
    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDecription,
        ...interviewReportByAI,
    })
    res.status(200).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}


export default createInterviewReport;