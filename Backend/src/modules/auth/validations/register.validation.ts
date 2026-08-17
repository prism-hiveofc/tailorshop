import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),

  email: Joi.string().email().required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  password: Joi.string().min(6).max(20).required(),
});