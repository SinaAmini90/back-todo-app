import jwt from "jsonwebtoken";
import { JWT_SECRETS } from "../secrets/secrets.js";

async function jwtSign(data) {
  return jwt.sign(data, JWT_SECRETS);
}

async function jwtValidator(jwt) {
  try {
    return jwt.verify(jwt, JWT_SECRETS);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { jwtSign, jwtValidator };
