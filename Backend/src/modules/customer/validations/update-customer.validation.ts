import Joi from "joi";

export const updateCustomerValidation = Joi.object({
  name: Joi.string().trim().required(),

  phone: Joi.string().trim().required(),

  alternatePhone: Joi.string()
    .trim()
    .allow("")
    .optional(),

  gender: Joi.string()
    .valid("MALE", "FEMALE", "OTHER")
    .required(),

  address: Joi.string()
    .trim()
    .required(),
});