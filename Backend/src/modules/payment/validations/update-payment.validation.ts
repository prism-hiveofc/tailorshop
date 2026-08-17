import Joi from "joi";

export const updatePaymentValidation = Joi.object({
  amount: Joi.number().positive().required(),

  paymentMethod: Joi.string()
    .valid("CASH", "UPI", "CARD", "BANK")
    .required(),

  remarks: Joi.string()
    .allow("")
    .required(),
});