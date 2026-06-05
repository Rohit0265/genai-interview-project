
import {PDFParse} from "pdf-parse";
import  generateInterviewReport from "../services/ai.services.js";
import interviewReportModel from "../models/interview.model.js";

/**
 * @name it will creat =e a interview report from user's resume ,self description and job description 
 
 */

const createInterviewReport = async(req,res) => {
    const resumeFile = req.file
    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription} = req.body
    const interviewReportByAI = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })
    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI,
    })
    res.status(200).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}


/**
 * @name it will get a interview report from user's id 
 */

const getInterviewReport = async(req,res) => {
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user.id})
    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }
    res.status(200).json({
        message:"Interview report fetched successfully",
        interviewReport
    })
}


async function getAllInterviewReport(req,res){
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillgaps -preparationPlan")
    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    })
}




export default {createInterviewReport,getInterviewReport,getAllInterviewReport};