import Joi from "joi";

export const updateOrderValidation = Joi.object({
  customerId: Joi.string().required(),

  deliveryDate: Joi.date().required(),

  dressType: Joi.string()
    .trim()
    .required(),

  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),

  totalAmount: Joi.number()
    .min(0)
    .required(),

  advanceAmount: Joi.number()
    .min(0)
    .required(),

  remarks: Joi.string()
    .allow("")
    .required(),

  status: Joi.string()
    .valid(
      "PENDING",
      "CUTTING",
      "STITCHING",
      "READY",
      "DELIVERED"
    )
    .required(),
});