import {generateInterviewReport,getAllInterviewReports,getInterviewReportById} from "./services.api.js";

import {useContext} from "react";

import { InterviewContext } from "../../interview.context.jsx";



export const useInterview = ()=>{

    const context = useContext(InterviewContext);
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {loading,setLoading,report,setReport,reports,setReports} = context;
    
    const generateReport = async({
        jobDescription,
        selfDescription,
        resumeFile
    })=>{
        try{
            setLoading(true);
            const response = await generateInterviewReport({jobDescription,selfDescription,resumeFile});
            setReport(response);
            // return response;
        }catch(error){
            console.log("error");
            throw error;
        }finally{
            setLoading(false);
        }
    }

    const getReportById = async(interviewId)=>{
        try{
            setLoading(true);
            const response = await getInterviewReportById(interviewId);
            setReport(response);
            // return response;
        }catch(error){
            console.log("error");
            throw error;
        }finally{
            setLoading(false);
        }
    }

    const getAllReports = async()=>{
        try{
            setLoading(true);
            const response = await getAllInterviewReports();
            setReports(response);
            // return response;
        }catch(error){
            console.log("error");
            throw error;
        }finally{
            setLoading(false);
        }
    }

    return {
        generateReport,
        getReportById,
        getAllReports,
        loading,
        report,
        reports
    }

}