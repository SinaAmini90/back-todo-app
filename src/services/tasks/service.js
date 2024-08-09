import {
  getTasksByUserId,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} from "../../models/todos/index.js";

function getUserTasksService(id) {
  const userTasks = getTasksByUserId(id);
  return userTasks;
}

function getTaskByIdService(id) {
  const task = getTaskById(id);
  return task;
}

function createTaskService(
  title,
  description,
  priority,
  reminder,
  category_id,
  deadline,
  user_id
) {
  const task = createTask(
    title,
    description,
    priority,
    reminder,
    category_id,
    deadline,
    user_id
  );
  return task;
}

function deleteTaskService(id) {
  deleteTask(id);
}

function updateTaskService(
  id,
  title,
  description,
  priority,
  reminder,
  category_id,
  deadline,
  completed
) {
  const task = updateTask(
    id,
    title,
    description,
    priority,
    reminder,
    category_id,
    deadline,
    completed
  );
  return task;
}
export {
  updateTaskService,
  deleteTaskService,
  getUserTasksService,
  getTaskByIdService,
  createTaskService,
};
