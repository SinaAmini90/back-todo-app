import jwt from "jsonwebtoken";
import { JWT_SECRETS } from "../secrets/secrets.js";

async function jwtSign(data) {
  return jwt.sign(data, JWT_SECRETS);
}

async function jwtValidator(token) {
  try {
    return jwt.verify(token, JWT_SECRETS);
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

export { jwtSign, jwtValidator };
