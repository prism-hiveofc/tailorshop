import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

import { getDateRangeOrders } from "../../services/report.service";

import type { ReportOrder } from "../../types/report";

import AppSnackbar from "../../components/common/AppSnackbar";

const DateRangeOrders = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [orders, setOrders] =
    useState<ReportOrder[]>([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as
      | "success"
      | "error"
      | "warning"
      | "info",
  });

  const handleSearch = async () => {
    if (!from || !to) {
      setSnackbar({
        open: true,
        message: "Please select both dates",
        severity: "error",
      });

      return;
    }

    if (from > to) {
      setSnackbar({
        open: true,
        message: "From date cannot be after To date",
        severity: "error",
      });

      return;
    }

    try {
      const response =
        await getDateRangeOrders(
          from,
          to
        );

      setOrders(response.data || []);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to fetch orders",
        severity: "error",
      });
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={2}
      >
        Date Range Orders
      </Typography>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          flexWrap="wrap"
        >
          <TextField
            type="date"
            label="From"
            value={from}
            onChange={(event) =>
              setFrom(event.target.value)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            type="date"
            label="To"
            value={to}
            onChange={(event) =>
              setTo(event.target.value)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Paper>

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
              <TableCell>Dress</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Advance</TableCell>
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
                  No orders found
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
                    ₹{order.advanceAmount}
                  </TableCell>

                  <TableCell>
                    ₹{order.balanceAmount}
                  </TableCell>

                  <TableCell>
                    {order.status}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </Box>
  );
};

export default DateRangeOrders;