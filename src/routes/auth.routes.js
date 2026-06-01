import express from "express";
import { registerUserContoller, loginUserController } from "../controllers/auth.controller.js";





const authRouter = express.Router()


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */


authRouter.post("/register",registerUserContoller)


/**
 * @route POST /api/auth/login
 * @description Login user
 * @access Public
 */

authRouter.post("/login",loginUserController)



export default authRouter;