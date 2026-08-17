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
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import Filter9PlusRoundedIcon from "@mui/icons-material/Filter9PlusRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  getCustomers,
} from "../../services/customer.service";

import {
  createOrder,
} from "../../services/order.service";

import type {
  Customer,
} from "../../types/customer";

import type {
  CreateOrderFormData,
} from "../../types/order";
import { createOrderSchema } from "../../validation/auth/order/create-order.schema";

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
  amber: "#A05A00",
  amberSoft: "#FBEEDD",
  radius: 3,
};

const formatCurrency = (value: number) =>
  `₹${(value || 0).toLocaleString("en-IN")}`;

const AddOrder = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [errorMessage, setErrorMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrderFormData>({
    resolver: yupResolver(
      createOrderSchema
    ),
    defaultValues: {
      customerId: "",
      deliveryDate: "",
      dressType: "",
      quantity: 1,
      totalAmount: 0,
      advanceAmount: 0,
      remarks: "",
    },
  });

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response =
          await getCustomers();

        setCustomers(response.data);
      } catch (error) {
        console.error(
          "CUSTOMERS ERROR:",
          error
        );
      }
    };

    loadCustomers();
  }, []);

  const onSubmit = async (
    data: CreateOrderFormData
  ) => {
    try {
      setErrorMessage("");

      if (
        data.advanceAmount >
        data.totalAmount
      ) {
        setErrorMessage(
          "Advance amount cannot exceed total amount"
        );

        return;
      }

      await createOrder(data);

      navigate("/orders");
    } catch (error: any) {
      console.error(
        "CREATE ORDER ERROR:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Failed to create order"
      );
    }
  };

  // Display-only: mirrors the form's live values into a summary
  // card (selected customer + running balance) so staff can see
  // the order take shape as they type. Doesn't affect validation
  // or what gets submitted — createOrderSchema still governs that.
  const watchedCustomerId = watch("customerId");
  const watchedTotal = watch("totalAmount");
  const watchedAdvance = watch("advanceAmount");
  const watchedDressType = watch("dressType");
  const watchedQuantity = watch("quantity");

  const selectedCustomer = customers.find(
    (customer) => customer._id === watchedCustomerId
  );

  const previewBalance =
    (Number(watchedTotal) || 0) - (Number(watchedAdvance) || 0);

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
          Workshop
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
        >
          Add Order
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Create a new customer order
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
              <ReceiptLongRoundedIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
              Order Details
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
              label="Customer"
              fullWidth
              {...register("customerId")}
              error={!!errors.customerId}
              helperText={
                errors.customerId?.message
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonSearchRoundedIcon
                      sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            >
              {customers.map((customer) => (
                <MenuItem
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.name} —{" "}
                  {customer.phone}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Delivery Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("deliveryDate")}
              error={!!errors.deliveryDate}
              helperText={
                errors.deliveryDate?.message
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthRoundedIcon
                      sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Dress Type"
              placeholder="Eg: Chudidar"
              {...register("dressType")}
              error={!!errors.dressType}
              helperText={
                errors.dressType?.message
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StyleRoundedIcon
                      sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
              gap={2}
            >
              <TextField
                label="Quantity"
                type="number"
                {...register("quantity", {
                  valueAsNumber: true,
                })}
                error={!!errors.quantity}
                helperText={
                  errors.quantity?.message
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Filter9PlusRoundedIcon
                        sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <TextField
                label="Total Amount"
                type="number"
                {...register("totalAmount", {
                  valueAsNumber: true,
                })}
                error={!!errors.totalAmount}
                helperText={
                  errors.totalAmount?.message
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
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            <TextField
              label="Advance Amount"
              type="number"
              {...register("advanceAmount", {
                valueAsNumber: true,
              })}
              error={!!errors.advanceAmount}
              helperText={
                errors.advanceAmount?.message
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Remarks"
              multiline
              rows={3}
              placeholder="Optional note about this order"
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            {errorMessage && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "#FBEAEC",
                }}
              >
                <ErrorOutlineRoundedIcon sx={{ color: "#A02334", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "#A02334" }}>
                  {errorMessage}
                </Typography>
              </Stack>
            )}

            <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={1.5}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/orders")
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
                  : "Create Order"}
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* =========================
            ORDER PREVIEW
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
              <ReceiptLongRoundedIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
              Order Preview
            </Typography>
          </Stack>

          {!selectedCustomer ? (
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
              <PersonSearchRoundedIcon sx={{ fontSize: 26, opacity: 0.5 }} />
              <Typography variant="body2" textAlign="center" px={2}>
                Select a customer to preview the order
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={1.25}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Customer
                </Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: TOKENS.ink }}>
                  {selectedCustomer.name}
                </Typography>
              </Box>

              <Stack direction="row" spacing={0.75} alignItems="center" justifyContent="flex-end">
                <PhoneRoundedIcon sx={{ fontSize: 14, color: TOKENS.inkMuted }} />
                <Typography variant="caption" sx={{ color: TOKENS.inkMuted }}>
                  {selectedCustomer.phone}
                </Typography>
              </Stack>

              <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Dress Type
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                  {watchedDressType || "—"}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Quantity
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                  {watchedQuantity || 0}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Total Amount
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                  {formatCurrency(Number(watchedTotal) || 0)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Advance
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                  {formatCurrency(Number(watchedAdvance) || 0)}
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
                    previewBalance > 0
                      ? TOKENS.amberSoft
                      : TOKENS.emeraldSoft,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    color:
                      previewBalance > 0
                        ? TOKENS.amber
                        : TOKENS.emerald,
                  }}
                >
                  Balance
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={800}
                  sx={{
                    color:
                      previewBalance > 0
                        ? TOKENS.amber
                        : TOKENS.emerald,
                  }}
                >
                  {formatCurrency(previewBalance)}
                </Typography>
              </Box>
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AddOrder;