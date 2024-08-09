import {
  createUser,
  getUserById,
  updateUser,
  getUserByUsername,
} from "../../models/users/index.js";
import {
  hashCreator,
  hashValidator,
} from "../../core/utils/encryption/index.js";
import { jwtSign } from "../../core/auth/jwt-auth.js";

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
async function loginUserService(username, password) {
  const user = await getUserByUsername(username);
  console.log("userinfo=>", user);
  if (!user) {
    throw new Error("username is not correct");
  }
  const isValid = hashValidator(password, user.password);
  if (!isValid) {
    throw new Error("password is not correct");
  }
  if (isValid) {
    const JwtUserData = {
      id: user.id,
      username: user.username,
    };
    const userJwt = jwtSign(JwtUserData);
    return;
  }
}

export {
  getUserByIdService,
  createUserService,
  updateUserService,
  loginUserService,
};
