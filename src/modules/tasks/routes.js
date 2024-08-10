import express from "express";
import {
  getTaskByUserIdController,
  // getTaskByIdController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} from "./controllers.js";
import { userIdValidator } from "../users/validations.js";
import { taskIdValidator } from "./validations.js";
const router = express.Router();

//get all tasks of user
router.get("", getTaskByUserIdController);
//creat task
router.post("", createTaskController);
//delete task
router.delete("/:id", taskIdValidator, deleteTaskController); //the task should be users task && the task should be exist
//edit task
router.put("", updateTaskController); //the task should be users task && the task should be exist

// router.get("/:id", taskIdValidator, getTaskByIdController);

// router.delete("/api/todoall", async (req, res) => {
//   try {
//     console.log("1");
//     await deleteAllTodos();

//     console.log("2");
//     res.status(201).json({
//       message: "todos delete successfully from database",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// router.put("/api/todo/alltik", async (req, res) => {
//   try {
//     await markAllAsComplite();
//     res.status(201).json({
//       message: "the todo update successfully in database",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

export { router };
