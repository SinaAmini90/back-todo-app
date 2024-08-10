import { query } from "../../core/database/database-handler.js";

//get all tasks of user
async function getTasksByUserId(id) {
  const queryContext = "select * from public.tasks where user_id=$1";
  const result = await query(queryContext, [id]);
  return result.rows;
}
//create task for user
async function createTask(
  title,
  description,
  priority,
  reminder,
  category_id,
  deadline,
  user_id
) {
  const queryContext =
    "insert into public.tasks (title, description, priority, reminder, category_id, deadline, user_id) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
  const result = await query(queryContext, [
    title,
    description,
    priority,
    reminder,
    category_id,
    deadline,
    user_id,
  ]);
  return result.rows;
}
//delete task
async function deleteTask(id) {
  const queryContext = "delete from public.tasks where id=$1";
  const result = await query(queryContext, [id]);
  return result;
}
//edit task
async function updateTask(
  id,
  title,
  description,
  priority,
  reminder,
  category_id,
  deadline,
  completed
) {
  const queryContext = `UPDATE public.tasks
  SET title =$2,  description =$3, priority=$4,  reminder=$5,  category_id=$6,  deadline=$7,completed =$8 
  WHERE id =$1 RETURNING *; `;
  const result = await query(queryContext, [
    id,
    title,
    description,
    priority,
    reminder,
    category_id,
    deadline,
    completed,
  ]);
  console.log("result=>", result);
  return result.rows;
}
//give userId of task
async function getUserIdOftask(id) {
  const queryContext = "select * from public.tasks where id=$1";
  const result = await query(queryContext, [id]);
  return result.rows[0].user_id;
}
// async function getTaskById(id) {
//   const queryContext = "select * from public.tasks where id=$1";
//   const result = await query(queryContext, [id]);
//   return result.rows;
// }

// async function deleteAllTodos() {
//   const queryContext = "delete from public.todos";
//   const result = await query(queryContext, []);
// }

// async function markAllAsComplite() {
//   const queryContext = "UPDATE public.todos set is_completed=$1  RETURNING *";
//   const result = await query(queryContext, [true]);
//   return result.rows;
// }

export {
  getTasksByUserId,
  deleteTask,
  updateTask,
  createTask,
  getUserIdOftask,
  // getTaskById,
  //   deleteAllTodos,
  //   markAllAsComplite,
};
