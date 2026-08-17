
  import { listOrders } from "../repositories/order.repostories";

  export const listOrdersAction = async () => {
    return await listOrders();
  };