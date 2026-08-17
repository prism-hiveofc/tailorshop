import Payment from "../../payment/models/payment.model";


export const getRecentPayments = async () => {

  return Payment.find({
    isDeleted:false
  })
  .populate(
    {
      path:"orderId",
      select:"orderNumber customerId",
      populate:{
        path:"customerId",
        select:"name phone"
      }
    }
  )
  .select(
    "amount paymentMethod remarks orderId createdAt"
  )
  .sort({
    createdAt:-1
  })
  .limit(5);

};