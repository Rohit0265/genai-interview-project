import express from "express";
import { registerUserContoller, loginUserController,logoutController, getMeController} from "../controllers/auth.controller.js";
import authuser from "../middlewares/auth.middleware.js";




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


/**
 * @route POST /api/auth/logout
 * @description logout user
 * @access public
 */


authRouter.get("/logout",logoutController)



/**
 * @route GET /api/auth/me
 * @description Get current user info
 * @access Private
 */


authRouter.get("/me",authuser,getMeController)






export default authRouter;