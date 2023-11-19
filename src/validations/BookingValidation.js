import Joi from "joi";
export const BookingValidate = (req) => {
  const schema = Joi.object({
    user_Id: Joi.string().required(),
    store_Id: Joi.string().required(),
    service_Ids: Joi.array().required(),
    time: Joi.array().required(),
    date: Joi.array().required(),
  });
  return schema.validate(req);
};
