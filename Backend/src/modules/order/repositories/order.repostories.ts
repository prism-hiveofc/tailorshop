

import Order from "../models/order.model";

import { ICreateOrderRequest } from "../interfaces/order.interface";

export const createOrder = async (
  data: ICreateOrderRequest & {
    orderNumber: string;
    balanceAmount: number;
    createdBy: string;
    updatedBy: string;
  }
) => {
  return Order.create(data);
};



export const searchOrders = async (
  keyword: string
) => {
  return Order.find({
    isDeleted: false,
    $or: [
      {
        orderNumber: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        dressType: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  })
    .populate(
      "customerId",
      "name phone"
    )
    .select("-__v")
    .sort({
      createdAt: -1,
    });
};

export const getLastOrder = async () => {
  return Order.findOne()
    .sort({
      createdAt: -1,
    })
    .select("orderNumber");
};


export const listOrders = async () => {
  return Order.find({
    isDeleted: false,
  })
    .populate(
      "customerId",
      "name phone"
    )
    .select("-__v")
    .sort({
      createdAt: -1,
    });
};

export const findOrderById = async (
  orderId: string
) => {
  return Order.findOne({
    _id: orderId,
    isDeleted: false,
  })
    .populate(
      "customerId",
      "name phone"
    )
    .select("-__v");
};


export const updateOrder = async (
  orderId: string,
  data: object
) => {
  return Order.findOneAndUpdate(
    {
      _id: orderId,
      isDeleted: false,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate(
      "customerId",
      "name phone"
    )
    .select("-__v");
};

export const softDeleteOrder = async (
  orderId: string,
  userId: string
) => {
  return Order.findOneAndUpdate(
    {
      _id: orderId,
      isDeleted: false,
    },
    {
      isDeleted: true,
      deletedAt: new Date(),
      updatedBy: userId,
    },
    {
      new: true,
    }
  );
};




export const updateOrderBalance = async (
  orderId: string,
  balanceAmount: number
) => {
  return Order.findByIdAndUpdate(
    orderId,
    {
      balanceAmount,
    },
    {
      new: true,
    }
  );
};

