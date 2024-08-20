import bcrypt from "bcrypt";
import { BCRYPT_CONFIG } from "../../configs/index.js";

const saltRounds = BCRYPT_CONFIG.rounds;

async function hashCreator(input) {
  try {
    const hash = await bcrypt.hash(input, saltRounds);
    return hash;
  } catch (error) {
    return error.message;
  }
}

async function hashValidator(input, hash) {
  try {
    const result = await bcrypt.compare(input, hash);
    return result;
  } catch (error) {
    console.error("Error during comparison:", error);
    return false;
  }
}

export { hashCreator, hashValidator };
