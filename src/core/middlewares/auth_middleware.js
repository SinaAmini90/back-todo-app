import { jwtValidator } from "../auth/jwt-auth.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "authorization header is missing!",
    });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header is not in the correct format!",
    });
  }
  const jwtToken = authHeader.split(" ")[1];
  console.log("jwtToken=>", jwtToken);
  if (!jwtToken) {
    res.status(401).json({
      message: "JWT Token is missing!",
    });
  }
  try {
    const tokenData = await jwtValidator(jwtToken);
    console.log("tokenData=>", tokenData);

    req.token = tokenData;
    next();
  } catch (error) {
    res.status(401).json({
      message: "invalid JWT Token!",
    });
  }
};
export { authMiddleware };
