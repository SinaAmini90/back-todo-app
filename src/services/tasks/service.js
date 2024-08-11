import {
  getUserIdOftask,
  getTasksByUserId,
  // getTaskById,
  createTask,
  deleteTask,
  updateTask,
} from "../../models/todos/index.js";

//get tasks of user
async function getUserTasksService(id) {
  const userTasks = await getTasksByUserId(id);
  return userTasks;
}
//create new task
async function createTaskService(
  id,
  title,
  description,
  priority,
  deadLineDate,
  deadLineTime,
  category,
  user_id
) {
  const task = await createTask(
    id,
    title,
    description,
    priority,
    deadLineDate,
    deadLineTime,
    category,
    user_id
  );
  return task;
}
//delete a task
async function deleteTaskService(id, user_id) {
  const userIdOfTask = await getUserIdOftask(id);
  if (userIdOfTask === user_id) {
    await deleteTask(id);
  } else {
    console.log("userId and taskId are not related togther.");
    throw new Error("user not allow to delete this task");
  }
}
//edit a task
async function updateTaskService(
  id,
  title,
  description,
  priority,
  reminder,
  category,
  deadline,
  completed,
  user_id
) {
  const userIdOfTask = await getUserIdOftask(id);
  console.log(JSON.stringify(userIdOfTask));
  console.log(user_id);
  if (userIdOfTask === user_id) {
    const task = await updateTask(
      id,
      title,
      description,
      priority,
      reminder,
      category,
      deadline,
      completed
    );
    return task;
  } else {
    console.log("userId and taskId are not related togther.");
    throw new Error("user not allow to edit this task");
  }
}

// function getTaskByIdService(id) {
//   const task = getTaskById(id);
//   return task;
// }

export {
  updateTaskService,
  deleteTaskService,
  getUserTasksService,
  // getTaskByIdService,
  createTaskService,
};
