import { ToolType } from "@google/genai"
import mongoose, { Mongoose } from "mongoose"
import { number } from "zod"

/**
 * -job description : string
 * - resume text : string
 * -text description : string
 * 
 * -score : Number
 * 
 * Technical questrion :[{
 * question:''
 * intention:''
 * answer:''
 * 
 * }]
 * behaviroual quetsions ;[
 * question:''
 * intention:''
 * answer:'']
 * skills gaps : [
 * {
 * skill:''
 * severity:{
 * type:string
 * enum : ["low","medium","high"]
 * }
 * }
 * ]
 * preparation plan :[{
 * day:Number,focus:String,Task:[string]}]
 */


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is Required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is Required"]
    }
},{
    _id:false
})


const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is Required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is Required"]
    }
},{
    _id:false
})



const skillgapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},{
    _id:false
})



const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:String,
        required:[true,"Day is Required"]
    },
    focus:{
        type:String,
        requred:[true,"Focus on which topic"]
    },
    task:[{
        type:String,
        required:[true,"Task is mandataory for better results"]
    }]
})



const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"JOb description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillgaps:[skillgapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})



const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema)

export default interviewReportModel
