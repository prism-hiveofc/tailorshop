import Joi from "joi";

export const createPaymentValidation =
  Joi.object({
    orderId: Joi.string().required(),

    amount: Joi.number()
      .positive()
      .required(),

    paymentMethod: Joi.string()
      .valid(
        "CASH",
        "UPI",
        "CARD",
        "BANK"
      )
      .required(),

    remarks: Joi.string()
      .allow("")
      .required(),
  });