import express from "express";
// import cors from "cors";
import { router as tasksRouter } from "./modules/tasks/routes.js";
import { router as userRouter } from "./modules/users/routes.js";
import logReqData from "./core/middlewares/logReqData.js";
import notFoundHandler from "./core/middlewares/errorHandler.js";
import { hashCreator } from "./core/utils/encryption/index.js";
import { authMiddleware } from "./core/middlewares/auth_middleware.js";

// app.use(cors());
const app = express();
app.use(express.json());
app.use(logReqData);
const serverPort = 3000;
app.get("/test", (req, res) => {
  res.json({
    message: "express js app is running",
  });
});

app.use("/api/task", authMiddleware, tasksRouter);
app.use("/api/user", userRouter);

app.use(notFoundHandler);

app.listen(serverPort, () => {
  console.log(`server is running on port ${serverPort}`);
});
