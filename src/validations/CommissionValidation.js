import Joi from "joi";
export const CommissionValidation = (req) => {
  const schema = Joi.object({
    value: Joi.number()
      .required("Commission Value is Required")
      .min(0)
      .max(100),

    type: Joi.string().valid("flight", "hotel").required().messages({
      "any.only": 'Commission Type must be "Flight" or "Hotel"',
      "string.empty": "Commission Type is Required",
    }),
  });
  return schema.validate(req);
};
