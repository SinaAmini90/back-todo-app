import {
  createUser,
  getUserById,
  updateUser,
} from "../../models/users/index.js";
import { hashCreator } from "../../core/utils/encryption/index.js";

function getUserByIdService(id) {
  const user = getUserById(id);
  return user;
}

async function createUserService(
  username,
  firstname,
  lastname,
  phonenumber,
  email,
  password
) {
  console.log(password);
  const hashPassword = await hashCreator(password);
  console.log(hashPassword);
  const user = createUser(
    username,
    firstname,
    lastname,
    phonenumber,
    email,
    hashPassword
  );
  return user;
}

function updateUserService(
  id,
  username,
  firstname,
  lastname,
  phonenumber,
  email,
  password
) {
  updateUser(id, username, firstname, lastname, phonenumber, email, password);
}
export { getUserByIdService, createUserService, updateUserService };
