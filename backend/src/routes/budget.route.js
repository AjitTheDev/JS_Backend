import { Router } from "express";
import { authorization } from "../controllers/user.controller.js";
import {addBudget,getUserBudget,updateUserBudget,deleteUserBudget} from '../controllers/budget.controller.js'

const router = Router();

router.route('/addBudget').post(authorization,addBudget)
router.route('/getUserBudget').get(authorization,getUserBudget)
router.route('/updateUserBudget/:id').patch(authorization,updateUserBudget)
router.route('/deleteUserBudget/:id').delete(authorization,deleteUserBudget)

export default router;