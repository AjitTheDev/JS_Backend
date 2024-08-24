import { Router } from "express";
import { createTodo,getTodoList,getByName, deleteTodo,updateTodo } from "../controllers/notes-controller.js";




const router = Router();






//routes
router.route("/create").post(createTodo)
router.route("/getAll").get(getTodoList)
router.route("/getByName/:name").get(getByName);
router.route("/deleteById/:id").delete(deleteTodo);
router.route("/updateById/:id").patch(updateTodo)
// /c/:username




export default router