import { generateInterviewReport, getAllInterviewReports, getInterviewReportById, generateResumePdf } from "../services/services.api.js";
import { useContext, useCallback } from "react";
import { InterviewContext } from "../../interview.context.jsx";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = useCallback(async ({
        jobDescription,
        selfDescription,
        resumeFile
    }) => {
        try {
            setLoading(true);
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.log("error");
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    const getReportById = useCallback(async (interviewId) => {
        try {
            setLoading(true);
            const response = await getInterviewReportById({ interviewId });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.log("error");
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    const getAllReports = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
            return response.interviewReports;
        } catch (error) {
            console.log("error");
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReports]);

    const getResumePdf = useCallback(async (interviewId) => {
        let response = null;
        try {
            response = await generateResumePdf({
                interviewId
            });
            const blob = new Blob([response], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `resume_${interviewId}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
            return response;
        } catch (error) {
            console.log("error");
            throw error;
        }
    }, []);

    return {
        generateReport,
        getReportById,
        getAllReports,
        loading,
        report,
        reports,
        getResumePdf
    };
};