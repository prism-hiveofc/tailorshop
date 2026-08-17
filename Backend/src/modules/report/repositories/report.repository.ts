import Payment from "../../payment/models/payment.model";

export const getDailyRevenue = async (
  date: string
) => {
  const start = new Date(
    `${date}T00:00:00.000`
  );

  const end = new Date(
    `${date}T23:59:59.999`
  );

  return Payment.aggregate([
    {
      $match: {
        isDeleted: false,
        createdAt: {
          $gte: start,
          $lte: end,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$amount",
        },
        totalPayments: {
          $sum: 1,
        },
      },
    },
  ]);
};


export const getMonthlyRevenue = async () => {
  const today = new Date();

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  return Payment.aggregate([
    {
      $match: {
        isDeleted: false,
        createdAt: {
          $gte: startOfMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$amount",
        },
        totalPayments: {
          $sum: 1,
        },
      },
    },
  ]);
};


import Order from "../../order/models/order.model";

export const getPendingOrders = async () => {
  return Order.find({
    status: "PENDING",
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


export const getDeliveredOrders = async () => {
  return Order.find({
    status: "DELIVERED",
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

export const getCustomerOrderHistory =
async (customerId: string) => {

  return Order.find({
    customerId,
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

export const getDateRangeOrders = async (
  from: string,
  to: string
) => {
  const startDate = new Date(from);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(to);
  endDate.setHours(23, 59, 59, 999);

  return Order.find({
    isDeleted: false,
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
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