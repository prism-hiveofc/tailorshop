import { getDashboardOverview }
from "../repositories/dashboard.repository";


export const getOverviewAction = async()=>{


 const overview =
 await getDashboardOverview();


 return overview;


};