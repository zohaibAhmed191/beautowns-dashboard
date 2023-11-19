import Joi from "joi";
export const EmailValidate = (req) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    message: Joi.string().min(3).required("Message is Required"),
    subject: Joi.string().min(3).required("Subject is Required"),
  });
  return schema.validate(req);
};
