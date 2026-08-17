import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";

import CustomerList from "../pages/Customers/CustomerList";
import CustomerAdd from "../pages/Customers/AddCustomer";
import EditCustomer from "../pages/Customers/EditCustomer";

import AddOrder from "../pages/Orders/AddOrder";
import OrderList from "../pages/Orders/OrderList";
import EditOrder from "../pages/Orders/EditOrder";
import PaymentList from "../pages/Payments/PaymentList";
import AddPayment from "../pages/Payments/AddPayment";
import EditPayment from "../pages/Payments/EditPayment";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Setting/setting";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      // Customers
      {
        path: "customers",
        element: <CustomerList />,
      },

      {
        path: "customers/add",
        element: <CustomerAdd />,
      },

      {
        path: "customers/:id/edit",
        element: <EditCustomer />,
      },

      // Orders
      {
        path: "orders",
        element: <OrderList />,
      },

      {
  path: "orders",
  element: <OrderList />,
},
{
  path: "orders/add",
  element: <AddOrder />,
},

{
  path: "/orders/edit/:id",
  element: <EditOrder />,
},

{
  path: "payments",
  element: <PaymentList />,
},

{
  path: "payments/add",
  element: <AddPayment />,
},

{
  path: "payments/edit/:id",
  element: <EditPayment />,
},
{
  path:"/reports",
  element:<Reports/>
},
{
  path:"/settings",
  element:<Settings/>
},
    ],
  },
]);