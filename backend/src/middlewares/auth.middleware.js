import jwt from "jsonwebtoken";
import tokenBlackListModel from "../models/blacklist.model.js";


const authuser = async (req,res,next)=>{    
    const token = req.cookies.token
    if (!token){
        return res.status(401).json({message:"token not provided"})
    }
    const isTokenblacklisted = await tokenBlackListModel.findOne({
        token
    })
    if (isTokenblacklisted){
        return res.status(401).json({message:"token is invalid"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"IInvalid token"})
    }
}

export default authuser