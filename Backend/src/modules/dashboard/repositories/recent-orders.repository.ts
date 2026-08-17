import Order from "../../order/models/order.model";


export const getRecentOrders = async () => {

 return Order.find({
  isDeleted:false
})
.populate(
  "customerId",
  "name phone"
)
.select(
  "orderNumber customerId deliveryDate dressType totalAmount status"
)
.sort({
  createdAt:-1
})
.limit(5);

};