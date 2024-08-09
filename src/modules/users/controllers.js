import {
  createUserService,
  getUserByIdService,
  updateUserService,
  loginUserService,
} from "../../services/users/service.js";

const getUserByIdController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await getUserByIdService(userId);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const createUserController = async (req, res, next) => {
  try {
    const { username, firstname, lastname, phonenumber, email, password } =
      req.body;
    await createUserService(
      username,
      firstname,
      lastname,
      phonenumber,
      email,
      password
    );
    res.status(201).json({
      message: "the user add successfully to database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const jwt = await loginUserService(username, password);
    res.status(200).json({
      jwt: jwt,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error.message,
    });
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const { id, username, firstname, lastname, phonenumber, email, password } =
      req.body;
    updateUserService(
      id,
      username,
      firstname,
      lastname,
      phonenumber,
      email,
      password
    );
    res.status(201).json({
      message: "the user update successfully in database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
export {
  loginUserController,
  getUserByIdController,
  createUserController,
  updateUserController,
};
