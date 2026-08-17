import Joi from "joi";

export const createCustomerValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  alternatePhone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow("")
    .optional(),

  gender: Joi.string()
    .valid("MALE", "FEMALE", "OTHER")
    .required(),

  address: Joi.string()
    .trim()
    .max(200)
    .required(),
});