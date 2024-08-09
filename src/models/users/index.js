import { query } from "../../core/database/database-handler.js";

async function getUserById(id) {
  const queryContext = "select * from public.users where id=$1";
  const result = await query(queryContext, [id]);
  return result.rows;
}

async function createUser(
  username,
  firstname,
  lastname,
  phonenumber,
  email,
  password
) {
  const queryContext =
    "insert into public.users (username, firstname, lastname, phonenumber, email, password) values ($1,$2,$3,$4,$5,$6) RETURNING *";
  const result = await query(queryContext, [
    username,
    firstname,
    lastname,
    phonenumber,
    email,
    password,
  ]);
  return result.rows;
}

async function getUserByUsername(username) {
  const queryContext = "select * from public.users where username = $1";
  const result = await query(queryContext, [username]);
  if (result) {
    return result.rows[0];
  } else {
    return false;
  }
}

async function updateUser(
  id,
  username,
  firstname,
  lastname,
  phonenumber,
  email,
  password
) {
  const queryContext = `UPDATE public.users SET username =$2,  firstname =$3, lastname =$4, phonenumber=$5, email=$6, password=$7  WHERE id =$1 RETURNING *; `;
  const result = await query(queryContext, [
    id,
    username,
    firstname,
    lastname,
    phonenumber,
    email,
    password,
  ]);
  return result;
}

export { getUserById, updateUser, createUser, getUserByUsername };
