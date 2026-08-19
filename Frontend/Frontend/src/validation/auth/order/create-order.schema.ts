import * as yup from "yup";

export const createOrderSchema = yup
  .object({
    customerId: yup
      .string()
      .required("Customer is required")
      .defined(),

    deliveryDate: yup
      .string()
      .required("Delivery date is required")
      .defined(),

    dressType: yup
      .string()
      .required("Dress type is required")
      .defined(),

    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required")
      .defined(),

    totalAmount: yup
      .number()
      .typeError("Total amount must be a number")
      .min(0, "Amount cannot be negative")
      .required("Total amount is required")
      .defined(),

    advanceAmount: yup
      .number()
      .typeError("Advance amount must be a number")
      .min(0, "Amount cannot be negative")
      .required("Advance amount is required")
      .defined(),

    remarks: yup
      .string()
      .required("Remarks are required")
      .defined(),
  })
  .defined();

export type CreateOrderFormData = yup.InferType<
  typeof createOrderSchema
>;
