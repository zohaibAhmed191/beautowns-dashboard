import Joi from "joi";
export const UserValidation = (req) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    age: Joi.number().required().min(18).max(100),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
  });
  return schema.validate(req);
};
