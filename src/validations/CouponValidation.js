import Joi from "joi";
export const CouponValidate = (req) => {
  const schema = Joi.object({
    target: Joi.string().valid("specific", "all").required(),
    userIds: Joi.array()
      .items(Joi.number().integer())
      .when("target", {
        is: "specific",
        then: Joi.array().items(Joi.number().integer()).min(1).required(),
        otherwise: Joi.array().items().forbidden(),
      }),
      type: Joi.object({
          fixedAmount: Joi.number().required()
        }).required(),
    quantity: Joi.number().min(1).required("quantity is Required"),
    amount: Joi.number().min(1).required("Amount is Required"),
    value: Joi.string().min(3).required("Code is Required"),
    validityDate: Joi.string().required("validityDate is Required"),
  });
  return schema.validate(req);
};
