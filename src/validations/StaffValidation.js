import Joi from "joi";
export const staffValidate = (req) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        "string.base": "Email is required*",
        "string.empty": "Email is required*",
        "any.required": "Email is required*",
      }),
    name: Joi.string().required().messages({
      "string.base": "Name is required*",
      "string.empty": "Name is required*",
      "any.required": "Name is required*",
    }),
    store_Id: Joi.string().required(),
    title: Joi.string().required().messages({
      "string.base": "Title is required*",
      "string.empty": "Title is required*",
      "any.required": "Title is required*",
    }),
    description: Joi.string().required().messages({
      "string.base": "Description is required*",
      "string.empty": "Description is required*",
      "any.required": "Description is required*",
    }),
    phone: Joi.number().required().messages({
      "number.base": "Phone is required*",
      "number.empty": "Phone is required*",
      "any.required": "Phone is required*",
    }),
    gender: Joi.string().valid("male", "female").required().messages({
      "string.base": "Gender is required*",
      "string.empty": "Gender is required*",
      "any.required": "Gender is required*",
    }),
    password: Joi.string().min(8).max(255).required().messages({
      "string.base": "Password is required*",
      "string.empty": "Password is required*",
      "any.required": "Password is required*",
      "string.min": "Password should have at least 8 characters",
    }),
    image: Joi.any(),
  });

  return schema.validate(req);
};
