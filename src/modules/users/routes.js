import express from "express";
import {
  createUserController,
  getUserByIdController,
  updateUserController,
  loginUserController,
} from "./controllers.js";
import {
  userEditValidator,
  userIdValidator,
  userInfoValidator,
} from "./validations.js";

const router = express.Router();
router.get("/:id", userIdValidator, getUserByIdController);
router.post("/signup", userInfoValidator, createUserController);
router.put("", userEditValidator, updateUserController);
router.post("/signin", loginUserController);
export { router };
