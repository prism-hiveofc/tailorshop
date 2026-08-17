import Payment from "../models/payment.model";

import { ICreatePaymentRequest } from "../interfaces/payment.interface";

export const createPayment = async (
  data: ICreatePaymentRequest & {
    createdBy: string;
    updatedBy: string;
  }
) => {
  return Payment.create(data);
};


export const listPayments = async () => {
  return Payment.find({
    isDeleted: false,
  })
    .populate(
      "orderId",
      "orderNumber balanceAmount"
    )
    .select("-__v")
    .sort({
      createdAt: -1,
    });
};

export const findPaymentById = async (
  paymentId: string
) => {
  return Payment.findOne({
    _id: paymentId,
    isDeleted: false,
  })
    .populate(
      "orderId",
      "orderNumber balanceAmount"
    )
    .select("-__v");
};


export const updatePayment = async (
  paymentId: string,
  data: object
) => {
  return Payment.findOneAndUpdate(
    {
      _id: paymentId,
      isDeleted: false,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate(
      "orderId",
      "orderNumber balanceAmount"
    )
    .select("-__v");
};

export const getPaymentsByOrder = async (
  orderId: string
) => {
  return Payment.find({
    orderId,
    isDeleted: false,
  });
};

export const searchPayments = async (
  keyword: string
) => {
  return Payment.find({
    isDeleted: false,
    paymentMethod: {
      $regex: keyword,
      $options: "i",
    },
  })
    .populate(
      "orderId",
      "orderNumber balanceAmount"
    )
    .select("-__v");
};

export const softDeletePayment = async (
  paymentId: string,
  userId: string
) => {

  console.log("DELETE ID:", paymentId);
  console.log("USER ID:", userId);


  const existingPayment = await Payment.findOne({
    _id: paymentId,
  });


  console.log(
    "EXISTING PAYMENT:",
    existingPayment
  );


  const deletedPayment =
    await Payment.findOneAndUpdate(
      {
        _id: paymentId,
        isDeleted: false,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
        updatedBy: userId,
      },
      {
        returnDocument: "after",
      }
    );


  console.log(
    "UPDATED PAYMENT:",
    deletedPayment
  );


  return deletedPayment;
};