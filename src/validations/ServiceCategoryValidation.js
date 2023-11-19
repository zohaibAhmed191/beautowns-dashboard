import Joi from "joi";
export const Service_category_Validate = (req) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required().label("image"),
  });
  return schema.validate(req);
};
