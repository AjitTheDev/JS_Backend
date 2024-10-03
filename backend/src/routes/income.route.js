import {Router} from 'express'
import { authorization } from '../controllers/user.controller.js';
import {addIncome,
    getUserIncome,
    updateUserIncome,
    getMonthlyIncome,
    deleteUserIncome} from '../controllers/income.controller.js'

const router = Router();


router.route('/addIncome').post(authorization,addIncome);
router.route('/getUserIncome').get(authorization,getUserIncome);
router.route('/updateUserIncome/:id').patch(authorization,updateUserIncome);
router.route('/deleteUserIncome/:id').delete(authorization,deleteUserIncome);
router.route('/getMonthlyIncome').get(authorization,getMonthlyIncome);




export default router;