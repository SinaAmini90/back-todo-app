import {
  getUserTasksService,
  // getTaskByIdService,
  createTaskService,
  deleteTaskService,
  updateTaskService,
} from "../../services/tasks/service.js";

//get all tasks of user
const getTaskByUserIdController = async (req, res, next) => {
  try {
    const userId = req.token.id; //=validate req.params.id;
    const userTasks = await getUserTasksService(userId);
    res.json(userTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
//create task
const createTaskController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      priority,
      deadlineDate,
      deadlineTime,
      category_id,
    } = req.body;
    const user_id = req.token.id;
    await createTaskService(
      title,
      description,
      priority,
      deadlineDate,
      deadlineTime,
      category_id,
      user_id
    );
    res.status(201).json({
      message: "the todo add successfully to database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
//delete task
const deleteTaskController = async (req, res, next) => {
  try {
    const taskId = req.validated.id; // = req.params.id;
    const userId = req.token.id;
    deleteTaskService(taskId, userId);
    res.status(201).json({
      message: "the todo delete successfully from database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
//edit task
const updateTaskController = async (req, res, next) => {
  try {
    const {
      id,
      title,
      description,
      priority,
      reminder,
      category_id,
      deadline,
      completed,
    } = req.body;
    const userId = req.token.id;
    await updateTaskService(
      id,
      title,
      description,
      priority,
      reminder,
      category_id,
      deadline,
      completed,
      userId
    );
    res.status(201).json({
      message: "the todo update successfully in database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// const getTaskByIdController = async (req, res, next) => {
//   try {
//     const taskId = req.validated.id; //=req.params.id;
//     const task = await getTaskByIdService(taskId);
//     res.json(task);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export {
  deleteTaskController,
  getTaskByUserIdController,
  // getTaskByIdController,
  updateTaskController,
  createTaskController,
};
