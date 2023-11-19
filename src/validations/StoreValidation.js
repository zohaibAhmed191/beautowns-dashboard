import Joi from "joi";
export const storeValidate = (req) => {
  const schema = Joi.object({
    salon_owner_Id: Joi.string().required(),
    segment_Id: Joi.string().required(),
    category_Id: Joi.string().required(),
    name: Joi.string().required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    no_of_slots: Joi.string().required(),
    city: Joi.string().required(),
    details: Joi.string().required(),
    image: Joi.any().required(),
    phone: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  });
  return schema.validate(req);
};
