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
  Chip,
  Skeleton,
} from "@mui/material";

import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  getPayment,
  updatePayment,
} from "../../services/payment.service";

import type { Payment } from "../../types/payment";

import {
  updatePaymentSchema,
  type UpdatePaymentFormData,
} from "../../validation/auth/payment/update-payment.schema";

// =========================
// DESIGN TOKENS
// Same editorial palette used across Reports, Payments and Orders —
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
  radius: 3,
};

const formatCurrency = (value: number) =>
  `₹${(value || 0).toLocaleString("en-IN")}`;

const methodStyles: Record<
  string,
  {
    bg: string;
    color: string;
    icon: React.ReactElement;
  }
> = {
  cash: {
    bg: TOKENS.emeraldSoft,
    color: TOKENS.emerald,
    icon: <AccountBalanceWalletRoundedIcon sx={{ fontSize: 15 }} />,
  },
  card: {
    bg: TOKENS.brassSoft,
    color: TOKENS.brass,
    icon: <CreditCardRoundedIcon sx={{ fontSize: 15 }} />,
  },
  upi: {
    bg: "#E7EEF9",
    color: "#2C5AA0",
    icon: <QrCode2RoundedIcon sx={{ fontSize: 15 }} />,
  },
  bank: {
    bg: "#F1EAFB",
    color: "#6B3FA0",
    icon: <AccountBalanceRoundedIcon sx={{ fontSize: 15 }} />,
  },
};

const getMethodStyle = (method: string) =>
  methodStyles[method?.toLowerCase()] || {
    bg: "#EFEFF2",
    color: TOKENS.inkMuted,
    icon: <PaymentsRoundedIcon sx={{ fontSize: 15 }} />,
  };

const EditPayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePaymentFormData>({
  resolver: yupResolver(updatePaymentSchema),
  defaultValues: {
    amount: 0,
    paymentMethod: "CASH",
    remarks: "",
  },
});

  useEffect(() => {
    const loadPayment = async () => {
      if (!id) return;

      try {
        const response = await getPayment(id);
        const data = response.data;

        setPayment(data);

        reset({
          amount: data.amount,
          paymentMethod: data.paymentMethod,
          remarks: data.remarks || "",
        });
      } catch (error) {
        console.error("GET PAYMENT ERROR:", error);

        setErrorMessage("Failed to load payment");
      } finally {
        setLoading(false);
      }
    };

    loadPayment();
  }, [id, reset]);

 const onSubmit = async (data: UpdatePaymentFormData) => {
    if (!id || !payment) return;

    try {
      setErrorMessage("");

      await updatePayment(id, data);

      navigate("/payments");
    } catch (error: any) {
      console.error("UPDATE PAYMENT ERROR:", error);

      setErrorMessage(
        error.response?.data?.message || "Failed to update payment"
      );
    }
  };

  const watchedAmount = watch("amount");
  const watchedMethod = watch("paymentMethod");
  const watchedRemarks = watch("remarks");

  const methodStyle = getMethodStyle(watchedMethod);

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
          Edit Payment
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Update payment details
        </Typography>
      </Box>

      {loading || !payment ? (
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1.6fr 1fr" }}
          gap={3}
        >
          <Skeleton variant="rounded" height={460} sx={{ borderRadius: TOKENS.radius }} />
          <Skeleton variant="rounded" height={260} sx={{ borderRadius: TOKENS.radius }} />
        </Box>
      ) : (
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
                label="Order"
                value={payment.orderId.orderNumber}
                fullWidth
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ReceiptLongRoundedIcon
                        sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <TextField
                label="Amount"
                type="number"
                fullWidth
                {...register("amount", { valueAsNumber: true })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeRoundedIcon
                        sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <TextField
                select
                label="Payment Method"
                fullWidth
                {...register("paymentMethod")}
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaymentsRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              >
                <MenuItem value="CASH">Cash</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="CARD">Card</MenuItem>
                <MenuItem value="BANK">Bank</MenuItem>
              </TextField>

              <TextField
                label="Remarks"
                multiline
                rows={3}
                fullWidth
                placeholder="Optional note about this payment"
                {...register("remarks")}
                error={!!errors.remarks}
                helperText={errors.remarks?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1.5 }}
                    >
                      <NotesRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              {errorMessage && (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ p: 1.5, borderRadius: 2, bgcolor: "#FBEAEC" }}
                >
                  <ErrorOutlineRoundedIcon sx={{ color: "#A02334", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "#A02334" }}>
                    {errorMessage}
                  </Typography>
                </Stack>
              )}

              <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

              <Box display="flex" justifyContent="flex-end" gap={1.5}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/payments")}
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
                  {isSubmitting ? "Updating..." : "Update Payment"}
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* =========================
              PAYMENT PREVIEW
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
                <PaymentsRoundedIcon fontSize="small" />
              </Avatar>
              <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
                Payment Preview
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Order
                </Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: TOKENS.ink }}>
                  {payment.orderId.orderNumber}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Method
                </Typography>
                <Chip
                  icon={methodStyle.icon}
                  label={watchedMethod}
                  size="small"
                  sx={{
                    bgcolor: methodStyle.bg,
                    color: methodStyle.color,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    "& .MuiChip-icon": { color: methodStyle.color },
                  }}
                />
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Remarks
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    color: watchedRemarks ? TOKENS.ink : "text.disabled",
                    fontStyle: watchedRemarks ? "normal" : "italic",
                    textAlign: "right",
                    maxWidth: "60%",
                  }}
                >
                  {watchedRemarks || "No remarks"}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: TOKENS.emeraldSoft,
                }}
              >
                <Typography variant="body2" fontWeight={700} sx={{ color: TOKENS.emerald }}>
                  Amount
                </Typography>
                <Typography variant="body1" fontWeight={800} sx={{ color: TOKENS.emerald }}>
                  {formatCurrency(Number(watchedAmount) || 0)}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default EditPayment;