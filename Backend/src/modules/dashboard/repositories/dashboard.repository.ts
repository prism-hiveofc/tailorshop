import Customer from "../../customer/models/customer.model";
import Order from "../../order/models/order.model";
import Payment from "../../payment/models/payment.model";


export const getDashboardOverview = async () => {


  const totalCustomers =
    await Customer.countDocuments({
      isDeleted:false
    });


  const totalOrders =
    await Order.countDocuments({
      isDeleted:false
    });


  const totalPayments =
    await Payment.countDocuments({
      isDeleted:false
    });


  const pendingOrders =
    await Order.countDocuments({
      status:"PENDING",
      isDeleted:false
    });


 const completedOrders =
  await Order.countDocuments({
    status:"DELIVERED",
    isDeleted:false
  });


  const revenue =
    await Payment.aggregate([
      {
        $match:{
          isDeleted:false
        }
      },
      {
        $group:{
          _id:null,
          total:{
            $sum:"$amount"
          }
        }
      }
    ]);


  return {

    totalCustomers,

    totalOrders,

    totalPayments,

    pendingOrders,

    completedOrders,

    totalRevenue:
      revenue[0]?.total || 0

  };

};