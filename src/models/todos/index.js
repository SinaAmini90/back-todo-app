import { query } from "../../core/database/database-handler.js";

//get all tasks of user
async function getTasksByUserId(id) {
  const queryContext = "select * from public.tasks where user_id=$1";
  const result = await query(queryContext, [id]);
  if (result) {
    return result.rows;
  } else {
    return null;
  }
}
//create task for user
async function createTask(
  id,
  title,
  description,
  priority,
  deadLineDate,
  deadLineTime,
  category,
  user_id
) {
  console.log("insertdata", deadLineDate, deadLineTime);
  const queryContext =
    "insert into public.tasks (id, title, description, priority, deadlinedate, deadlinetime, category, user_id) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
  const result = await query(queryContext, [
    id,
    title,
    description,
    priority,
    deadLineDate,
    deadLineTime,
    category,
    user_id,
  ]);
  if (result) {
    console.log("result", result.rows);

    return result.rows;
  } else {
    console.log("***database did not create the task***");
    throw new Error("database error");
  }
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
  deadLineDate,
  deadLineTime,
  category
  // user_id
) {
  const queryContext = `UPDATE public.tasks
  SET title =$2,  description =$3, priority=$4,  deadLineDate=$5,  deadLineTime=$6,  category=$7 
  WHERE id =$1 RETURNING *; `;
  const result = await query(queryContext, [
    id,
    title,
    description,
    priority,
    deadLineDate,
    deadLineTime,
    category,
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
