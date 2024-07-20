import express from "express";
import {
  createUserController,
  getUserByIdController,
  updateUserController,
} from "./controllers.js";
import {
  userEditValidator,
  userIdValidator,
  userInfoValidator,
} from "./validations.js";

const router = express.Router();
router.get("/api/user/:id", userIdValidator, getUserByIdController);
router.post("/api/signup", userInfoValidator, createUserController);
router.put("/api/user", userEditValidator, updateUserController);

export { router };
