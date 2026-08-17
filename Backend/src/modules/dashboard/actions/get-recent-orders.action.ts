import { getRecentOrders }
from "../repositories/recent-orders.repository";


export const getRecentOrdersAction = async()=>{

 const orders =
 await getRecentOrders();


 return orders;

};