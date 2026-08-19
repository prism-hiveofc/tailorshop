import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Avatar,
  Stack,
  InputAdornment,
  Divider,
} from "@mui/material";

import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getOrders } from "../../services/order.service";
import { createPayment } from "../../services/payment.service";

import type { Order } from "../../types/order";

import {
  createPaymentSchema,
  type CreatePaymentFormData,
} from "../../validation/auth/payment/create-payment.schema";

import AppSnackbar from "../../components/common/AppSnackbar";

// =========================
// DESIGN TOKENS
// Same editorial palette used across Reports and Payments —
// charcoal ink + muted brass accent — kept consistent here.
// =========================
const TOKENS = {
  ink: "#1C1B29",
  inkMuted: "#5B5A6B",
  hairline: "#E7E5EE",
  surface: "#FFFFFF",
  canvas: "#F7F6F9",
  brass: "#9C7A2E",
  brassSoft: "#F6EFDE",
  emerald: "#1E6B4C",
  emeraldSoft: "#E7F3EC",
  amber: "#A05A00",
  amberSoft: "#FBEEDD",
  radius: 3,
};

const formatCurrency = (value: number) =>
  `₹${(value || 0).toLocaleString("en-IN")}`;

// Display-only icon lookup for the payment method dropdown —
// purely cosmetic, doesn't touch the submitted value ("CASH", "UPI", etc).
const methodIcons: Record<string, React.ReactNode> = {
  CASH: <AccountBalanceWalletRoundedIcon sx={{ fontSize: 18 }} />,
  UPI: <QrCode2RoundedIcon sx={{ fontSize: 18 }} />,
  CARD: <CreditCardRoundedIcon sx={{ fontSize: 18 }} />,
  BANK: <AccountBalanceRoundedIcon sx={{ fontSize: 18 }} />,
};

const AddPayment = () => {
  const navigate = useNavigate();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [snackbar, setSnackbar] =
    useState({
      open: false,
      message: "",
      severity: "success" as
        | "success"
        | "error"
        | "warning"
        | "info",
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } =useForm<CreatePaymentFormData>({
  resolver: yupResolver(createPaymentSchema),
  defaultValues: {
    orderId: "",
    amount: 0,
    paymentMethod: "CASH",
    remarks: "",
  },
});

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response =
          await getOrders();

        setOrders(response.data);
      } catch (error: any) {
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message ||
            "Failed to load orders",
          severity: "error",
        });
      }
    };

    loadOrders();
  }, []);

  const onSubmit = async (
    data: CreatePaymentFormData
  ) => {
    try {
      const selectedOrder =
        orders.find(
          (order) =>
            order._id === data.orderId
        );

      if (!selectedOrder) {
        setSnackbar({
          open: true,
          message: "Please select an order",
          severity: "error",
        });

        return;
      }

      if (
        data.amount >
        selectedOrder.balanceAmount
      ) {
        setSnackbar({
          open: true,
          message:
            "Payment cannot exceed order balance",
          severity: "error",
        });

        return;
      }

      const response =
        await createPayment(data);

      setSnackbar({
        open: true,
        message:
          response.message ||
          "Payment created successfully",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/payments");
      }, 500);

    } catch (error: any) {
      console.error(
        "CREATE PAYMENT ERROR:",
        error
      );

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to create payment",
        severity: "error",
      });
    }
  };

  // Display-only: reflects the currently selected order in a
  // preview card so the shop staff can double-check the balance
  // before entering an amount. Doesn't affect validation/submit.
  const watchedOrderId = watch("orderId");
  const selectedOrder = orders.find(
    (order) => order._id === watchedOrderId
  );

  return (
    <Box sx={{ bgcolor: TOKENS.canvas, minHeight: "100%", pb: 4 }}>
      {/* =========================
          HEADER
      ========================= */}

      <Box
        mb={4}
        pb={3}
        sx={{ borderBottom: "1px solid", borderColor: TOKENS.hairline }}
      >
        <Typography
          variant="overline"
          sx={{ color: TOKENS.brass, fontWeight: 700, letterSpacing: 1.4 }}
        >
          Billing
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
        >
          Add Payment
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Record a payment received for an order
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1.6fr 1fr" }}
        gap={3}
        alignItems="start"
      >
        {/* =========================
            FORM
        ========================= */}

        <Paper
          sx={{
            p: 3,
            borderRadius: TOKENS.radius,
            border: "1px solid",
            borderColor: TOKENS.hairline,
            boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: TOKENS.canvas,
                color: TOKENS.ink,
                width: 38,
                height: 38,
                borderRadius: 2,
              }}
            >
              <PaymentsRoundedIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
              Payment Details
            </Typography>
          </Stack>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={2.5}
          >
            <TextField
              select
              label="Order"
              fullWidth
              {...register("orderId")}
              error={!!errors.orderId}
              helperText={
                errors.orderId?.message
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ReceiptLongRoundedIcon
                      sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            >
              {orders.map((order) => (
                <MenuItem
                  key={order._id}
                  value={order._id}
                >
                  {order.orderNumber} —{" "}
                  {order.customerId.name} — Balance{" "}
                  {formatCurrency(order.balanceAmount)}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Amount"
              type="number"
              fullWidth
              {...register("amount", {
                valueAsNumber: true,
              })}
              error={!!errors.amount}
              helperText={
                errors.amount?.message ||
                (selectedOrder
                  ? `Balance due: ${formatCurrency(
                      selectedOrder.balanceAmount
                    )}`
                  : undefined)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeRoundedIcon
                      sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />

            <TextField
              select
              label="Payment Method"
              fullWidth
              {...register("paymentMethod")}
              error={!!errors.paymentMethod}
              helperText={
                errors.paymentMethod?.message
              }
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            >
              <MenuItem value="CASH">
                <Stack direction="row" spacing={1.25} alignItems="center">
                  {methodIcons.CASH}
                  <span>Cash</span>
                </Stack>
              </MenuItem>

              <MenuItem value="UPI">
                <Stack direction="row" spacing={1.25} alignItems="center">
                  {methodIcons.UPI}
                  <span>UPI</span>
                </Stack>
              </MenuItem>

              <MenuItem value="CARD">
                <Stack direction="row" spacing={1.25} alignItems="center">
                  {methodIcons.CARD}
                  <span>Card</span>
                </Stack>
              </MenuItem>

              <MenuItem value="BANK">
                <Stack direction="row" spacing={1.25} alignItems="center">
                  {methodIcons.BANK}
                  <span>Bank</span>
                </Stack>
              </MenuItem>
            </TextField>

            <TextField
              label="Remarks"
              multiline
              rows={3}
              fullWidth
              placeholder="Optional note about this payment"
              {...register("remarks")}
              error={!!errors.remarks}
              helperText={
                errors.remarks?.message
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ alignSelf: "flex-start", mt: 1.5 }}
                  >
                    <NotesRoundedIcon
                      sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />

            <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={1.5}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/payments")
                }
                sx={{
                  color: TOKENS.ink,
                  borderColor: TOKENS.hairline,
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: TOKENS.ink,
                    bgcolor: TOKENS.canvas,
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  bgcolor: TOKENS.ink,
                  borderRadius: 2,
                  fontWeight: 600,
                  boxShadow: "none",
                  px: 3,
                  "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
                }}
              >
                {isSubmitting
                  ? "Creating..."
                  : "Create Payment"}
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* =========================
            SELECTED ORDER PREVIEW
            (display-only summary, no logic)
        ========================= */}

        <Paper
          sx={{
            p: 3,
            borderRadius: TOKENS.radius,
            border: "1px solid",
            borderColor: TOKENS.hairline,
            boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
            position: { md: "sticky" },
            top: { md: 24 },
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: TOKENS.canvas,
                color: TOKENS.ink,
                width: 38,
                height: 38,
                borderRadius: 2,
              }}
            >
              <PersonSearchRoundedIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
              Order Summary
            </Typography>
          </Stack>

          {!selectedOrder ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{
                py: 5,
                color: TOKENS.inkMuted,
                bgcolor: TOKENS.canvas,
                borderRadius: 2,
                border: "1px dashed",
                borderColor: TOKENS.hairline,
              }}
            >
              <ReceiptLongRoundedIcon sx={{ fontSize: 26, opacity: 0.5 }} />
              <Typography variant="body2" textAlign="center" px={2}>
                Select an order to see its balance here
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={1.25}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Order
                </Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: TOKENS.ink }}>
                  {selectedOrder.orderNumber}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Customer
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                  {selectedOrder.customerId.name}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Total Amount
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                  {formatCurrency(selectedOrder.totalAmount)}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mt: 1,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor:
                    selectedOrder.balanceAmount > 0
                      ? TOKENS.amberSoft
                      : TOKENS.emeraldSoft,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    color:
                      selectedOrder.balanceAmount > 0
                        ? TOKENS.amber
                        : TOKENS.emerald,
                  }}
                >
                  Balance Due
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={800}
                  sx={{
                    color:
                      selectedOrder.balanceAmount > 0
                        ? TOKENS.amber
                        : TOKENS.emerald,
                  }}
                >
                  {formatCurrency(selectedOrder.balanceAmount)}
                </Typography>
              </Box>
            </Stack>
          )}
        </Paper>
      </Box>

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

export default AddPayment;