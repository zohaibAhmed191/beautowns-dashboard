import Joi from "joi";
export const SubAdminValidation = (req) => {
  const schema = Joi.object({
    userName: Joi.string().required().min(3).max(255),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(req);
};

export const SubAdminUpdateValidation = (req) => {
  const schema = Joi.object({
    userName: Joi.string().required().min(3).max(255),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string(),
  });
  return schema.validate(req);
};
