import { getRecentPayments }
from "../repositories/recent-payments.repository";


export const getRecentPaymentsAction =
async()=>{

 const payments =
 await getRecentPayments();


 return payments;

};