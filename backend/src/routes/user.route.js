import { Router } from "express";
import {loginUser, registerUser, getAllUsers,authorization,logoutUser} from '../controllers/user.controller.js'


const router = Router();


//Routes
router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").get(authorization,logoutUser);
router.route("/getUsers").get(authorization,getAllUsers)

export default router;