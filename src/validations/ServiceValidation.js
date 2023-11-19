import Joi from "joi";
export const serviceValidate = (req) => {
  const schema = Joi.object({
    store_Id: Joi.string().required(),
    service_category_Id: Joi.string().required().messages({
      "string.base": "Service Category is required*",
      "string.empty": "Service Category is required*",
      "any.required": "Service Category is required*",
    }),
    segment_Id: Joi.string().required().messages({
      "string.base": "Service type is required*",
      "string.empty": "Service type is required*",
      "any.required": "Service type is required*",
    }),
    name: Joi.string().required().messages({
      "string.base": "Service name is required*",
      "string.empty": "Service name is required*",
      "any.required": "Service name is required*",
    }),
    duration: Joi.string().required().messages({
      "string.base": "Service duration is required*",
      "string.empty": "Service duration is required*",
      "any.required": "Service duration is required*",
    }),
    value: Joi.string().required().messages({
      "string.base": "Service type is required*",
      "string.empty": "Service type is required*",
      "any.required": "Service type is required*",
    }),
    noOfPeople: Joi.string().required().messages({
      "string.base": "No of people is required*",
      "string.empty": "No of people is required*",
      "any.required": "No of people is required*",
    }),
    description: Joi.string().required().messages({
      "string.base": "Description is required*",
      "string.empty": "Description is required*",
      "any.required": "Description is required*",
    }),
    image: Joi.any(),
  });
  return schema.validate(req);
};
