import { Router } from "express";
import {
        loginUser, 
        registerUser,
        getAllUsers, 
        authorization, 
        logoutUser,
        finalizeMonth,
        getUserWealth
    } from '../controllers/user.controller.js'


const router = Router();


//Routes
router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").get(authorization,logoutUser);
router.route("/getUsers").get(authorization,getAllUsers)
router.route("/finalizeMonth").post(authorization,finalizeMonth)
router.route("/getUserWealth").get(authorization,getUserWealth)

export default router;