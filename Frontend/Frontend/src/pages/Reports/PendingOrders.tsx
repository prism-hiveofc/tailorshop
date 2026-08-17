import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import { getPendingOrders } from "../../services/report.service";

import type { ReportOrder } from "../../types/report";

const PendingOrders = () => {
  const [orders, setOrders] = useState<ReportOrder[]>([]);

  const loadOrders = async () => {
    try {
      const response = await getPendingOrders();

      setOrders(response.data || []);
    } catch (error) {
      console.error(
        "PENDING ORDERS ERROR:",
        error
      );
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={2}
      >
        Pending Orders
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Dress</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                >
                  No pending orders
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order._id}
                  hover
                >
                  <TableCell>
                    <Typography fontWeight={600}>
                      {order.orderNumber}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {order.customerId.name}
                  </TableCell>

                  <TableCell>
                    {order.customerId.phone}
                  </TableCell>

                  <TableCell>
                    {order.dressType}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      order.deliveryDate
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    ₹{order.totalAmount}
                  </TableCell>

                  <TableCell>
                    ₹{order.balanceAmount}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={order.status}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingOrders;