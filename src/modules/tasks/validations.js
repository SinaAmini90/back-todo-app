import Joi from "joi";
//check structure of id is valid?
const taskIdValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    }).required();

    const validationResult = await schema.validateAsync(req.params);
    req.validated = validationResult;
    next();
  } catch (error) {
    console.log(error);
  }
};

const createTaskValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      key: Joi.number().optional(),
      id: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string().optional().allow(""),
      priority: Joi.string().valid("low", "mid", "high", "default").required(),
      deadlinedate: Joi.string().required(),
      deadlinetime: Joi.string().optional().allow(""),
      category: Joi.string()
        .valid(
          "noGroup",
          "draft",
          "personal",
          "home",
          "business",
          "sport",
          "study",
          "birthday"
        )
        .required(),
    }).required();
    const validatedData = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.validated = validatedData;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.details.map((detail) => detail.message) });
  }
};

export { taskIdValidator, createTaskValidator };
