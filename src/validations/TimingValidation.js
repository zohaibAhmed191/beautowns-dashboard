import Joi from "joi";

export const timeValidate = (req) => {
  const schema = Joi.object().keys([{
    from: Joi.string().when("isAvailable", {
      is: true,
      then: Joi.string().required().messages({
        "any.required": '"From" time is required when available',
      }),
      otherwise: Joi.string().optional(),
    }),
    to: Joi.string().when("isAvailable", {
      is: true,
      then: Joi.string().required().messages({
        "any.required": '"To" time is required when available',
      }),
      otherwise: Joi.string().optional(),
    }),
    isAvailable: Joi.boolean(),
  }]);
  return schema.validate(req);
};
