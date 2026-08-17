import * as yup from "yup";

export const createOrderSchema = yup.object({
  customerId: yup
    .string()
    .required("Customer is required"),

  deliveryDate: yup
    .string()
    .required("Delivery date is required"),

  dressType: yup
    .string()
    .required("Dress type is required"),

  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),

  totalAmount: yup
    .number()
    .typeError("Total amount must be a number")
    .min(0, "Amount cannot be negative")
    .required("Total amount is required"),

  advanceAmount: yup
    .number()
    .typeError("Advance amount must be a number")
    .min(0, "Amount cannot be negative")
    .required("Advance amount is required"),

  remarks: yup
    .string()
    .defined()
    .default(""),
});