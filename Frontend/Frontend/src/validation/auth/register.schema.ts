import * as yup from "yup";

export const registerSchema = yup.object({

  name: yup
    .string()
    .required("Username is required")
    .min(3, "Minimum 3 characters"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be 10 digits"
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Passwords do not match"
    )
    .required("Confirm password is required"),

});