import * as yup from "yup";

export const createPaymentSchema = yup.object({
  orderId: yup
    .string()
    .required("Order is required"),

  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),

  paymentMethod: yup
    .mixed<"CASH" | "UPI" | "CARD" | "BANK">()
    .oneOf(["CASH", "UPI", "CARD", "BANK"])
    .required("Payment method is required"),

  remarks: yup
    .string()
    .required("Remarks is required"),
});

export type CreatePaymentFormData = yup.InferType<
  typeof createPaymentSchema
>;