import Customer from "../models/customer.model";

import { ICreateCustomerRequest } from "../interfaces/customer.interface";

export const findCustomerByPhone = async (phone: string) => {
    return Customer.findOne({
        phone,
        isDeleted: false,
    });
};

export const createCustomer = async (
  data: ICreateCustomerRequest & {
    createdBy: string;
    updatedBy: string;
  }
) => {
  return Customer.create(data);
};

export const findCustomerById = async (
    customerId: string
) => {
    return Customer.findOne({
        _id: customerId,
        isDeleted: false,
    }).select("-__v");
};

export const listCustomers = async () => {
    return Customer.find({
        isDeleted: false,
    })
        .select("-__v")
        .sort({
            createdAt: -1,
        });
};
export const updateCustomer = async (
  customerId: string,
  data: object
) => {
  return Customer.findOneAndUpdate(
    {
      _id: customerId,
      isDeleted: false,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  ).select("-__v");
};

export const softDeleteCustomer = async (
  customerId: string,
  updatedBy: string
) => {
  return Customer.findOneAndUpdate(
    {
      _id: customerId,
      isDeleted: false,
    },
    {
      isDeleted: true,
      deletedAt: new Date(),
      updatedBy,
    },
    {
      new: true,
    }
  ).select("-__v");
};


export const searchCustomer = async (
  keyword: string
) => {
 return Customer.find({
  isDeleted: false,
  $or: [
    {
      name: {
        $regex: keyword,
        $options: "i",
      },
    },
    {
      phone: {
        $regex: keyword,
        $options: "i",
      },
    },
  ],
})
    .select("-__v")
    .sort({
      createdAt: -1,
    });
};

export const customerExists = async (
  customerId: string
) => {
  return Customer.findOne({
    _id: customerId,
    isDeleted: false,
  });
};