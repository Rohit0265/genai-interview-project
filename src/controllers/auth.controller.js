import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenBlackListModel from "../models/blacklist.model.js";
/**
 * 
 * @name register new user
 * @description register a new user
 * @access Public
 */


async function registerUserContoller(req,res){
    try {
        const {username,email,password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({
                message : "Please provide username, email and password"
            })
        }
        const isUserAlreadyExist = await userModel.findOne({
            $or : [{username},{email}]
        })
        if(isUserAlreadyExist){
            return res.status(400).json({
                message:"Account already exists with this email address or username"
            })
        }
        const hash = await bcrypt.hash(password,10);
        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        const token = jwt.sign({
            id:user._id,username:user.username},
            process.env.JWT_SECRET || "default_jwt_secret",
            {expiresIn:"1d"}
        )
        res.cookie("token",token)

        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name login controller
 * @description login user
 * @access Public
 */


async function loginUserController(req,res){

        const {email,password} = req.body;

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const token = jwt.sign({
            id:user._id,username:user.username},
            process.env.JWT_SECRET || "default_jwt_secret",
            {expiresIn:"1d"}
        )
        res.cookie("token",token)
        res.status(200).json({
            message:"User logged in successfully",
            user:{
                id:user._id,
                username:user.username,
                email : user.email,
        }
    })
}


/**
 * @name logout controller
 * @description logout user
 * @access Public
 */

async function logoutController(req,res){
    const token = req.cookies.token

    if(token){
        await tokenBlackListModel.create({
            token
        })
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out successfully"
    })

}

export {registerUserContoller,loginUserController,logoutController};


