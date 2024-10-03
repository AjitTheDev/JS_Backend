import { Router } from "express";
import { authorization } from "../controllers/user.controller.js";
import {
    addExpense,
    getAllExpenses,
    getUserExpense,
    updateExpense,
    getMonthlyExpense,
    deleteExpense} from '../controllers/expense.controller.js'


const router = Router()


router.route("/addExpense").post(authorization,addExpense)
router.route("/getAllExpense").get(authorization,getAllExpenses)
router.route("/getUserExpense").get(authorization,getUserExpense)
router.route("/updateExpenseById/:id").patch(authorization,updateExpense)
router.route("/deleteExpenseById/:id").delete(authorization,deleteExpense)
router.route("/getMonthlyExpense").get(authorization,getMonthlyExpense) //eg : 2024-09


export default router;