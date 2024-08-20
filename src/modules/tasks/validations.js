import { getTaskById } from "../../models/todos/index.js";
import Joi from "joi";
//check structure of id is valid?
const taskIdValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    }).required();

    const validationResult = await schema.validateAsync(req.params);
    req.validated = validationResult;
    next();
  } catch (error) {
    console.log(error);
  }
};

const createTaskValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      key: Joi.number().optional(),
      id: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string().optional().allow(""),
      priority: Joi.string().valid("low", "mid", "high", "default").required(),
      deadlinedate: Joi.string().required(),
      deadlinetime: Joi.string().optional().allow(""),
      category: Joi.string()
        .valid(
          "noGroup",
          "draft",
          "personal",
          "home",
          "business",
          "sport",
          "study",
          "birthday"
        )
        .required(),
    }).required();
    const validatedData = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.validated = validatedData;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.details.map((detail) => detail.message) });
  }
};
//check if task id exist? check if user and task has relation?
const taskUserRelationValidator = async (req, res, next) => {
  try {
    const userId = req.token.id;
    const taskId = req.body.id;
    console.log("userId", userId, "taskId", taskId);
    const task = await getTaskById(taskId);
    console.log(task);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to edit this task" });
    }
    next();
  } catch (error) {
    console.error("Error during user-task validation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { taskIdValidator, createTaskValidator, taskUserRelationValidator };
