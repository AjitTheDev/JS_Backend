import { Router } from "express";
import { authorization } from "../controllers/user.controller.js";
import { getRecentHistory} from '../controllers/history.controller.js'


const router = Router();




router.route('/getRecentHistory').get(authorization, getRecentHistory)




export default router;