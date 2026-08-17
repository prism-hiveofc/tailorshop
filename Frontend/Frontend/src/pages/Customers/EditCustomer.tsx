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
  Skeleton,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PhoneForwardedRoundedIcon from "@mui/icons-material/PhoneForwardedRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCustomer,
  updateCustomer,
} from "../../services/customer.service";

import type { CustomerFormData } from "../../types/customer";

// =========================
// DESIGN TOKENS
// Same editorial palette used across Reports, Payments, Orders and Customers —
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
  radius: 3,
};

const getInitials = (name: string) =>
  name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

const EditCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>();

  useEffect(() => {
    const loadCustomer = async () => {
      if (!id) return;

      try {
        const response = await getCustomer(id);

        reset({
          name: response.data.name,
          phone: response.data.phone,
          alternatePhone: response.data.alternatePhone || "",
          gender: response.data.gender,
          address: response.data.address,
        });
      } catch (error) {
        console.error("GET CUSTOMER ERROR:", error);

        setErrorMessage("Failed to load customer");
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [id, reset]);

  const onSubmit = async (data: CustomerFormData) => {
    if (!id) return;

    try {
      setErrorMessage("");

      const {
        _id,
        createdAt,
        updatedAt,
        __v,
        ...payload
      } = data as CustomerFormData & {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      };

      await updateCustomer(id, payload);

      navigate("/customers");
    } catch (error: any) {
      console.error("UPDATE CUSTOMER ERROR:", error);

      setErrorMessage(
        error.response?.data?.message || "Failed to update customer"
      );
    }
  };

  const watchedName = watch("name");
  const watchedPhone = watch("phone");
  const watchedAlternatePhone = watch("alternatePhone");
  const watchedGender = watch("gender");
  const watchedAddress = watch("address");

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
          Directory
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
        >
          Edit Customer
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Update customer information
        </Typography>
      </Box>

      {loading ? (
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1.6fr 1fr" }}
          gap={3}
        >
          <Skeleton variant="rounded" height={520} sx={{ borderRadius: TOKENS.radius }} />
          <Skeleton variant="rounded" height={280} sx={{ borderRadius: TOKENS.radius }} />
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
                <EditRoundedIcon fontSize="small" />
              </Avatar>
              <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
                Customer Details
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
                label="Customer Name"
                fullWidth
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
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
                  label="Phone"
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <TextField
                  label="Alternate Phone"
                  {...register("alternatePhone")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneForwardedRoundedIcon
                          sx={{ color: TOKENS.inkMuted, fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Box>

              <TextField
                select
                label="Gender"
                fullWidth
                {...register("gender", {
                  required: "Gender is required",
                })}
                error={!!errors.gender}
                helperText={errors.gender?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WcRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>

              <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                {...register("address", {
                  required: "Address is required",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1.5 }}
                    >
                      <PlaceRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
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
                  onClick={() => navigate("/customers")}
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
                  {isSubmitting ? "Updating..." : "Update Customer"}
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* =========================
              CUSTOMER PREVIEW
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
                <PersonRoundedIcon fontSize="small" />
              </Avatar>
              <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
                Customer Preview
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: TOKENS.brassSoft,
                    color: TOKENS.brass,
                    fontWeight: 700,
                  }}
                >
                  {getInitials(watchedName)}
                </Avatar>
                <Box>
                  <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
                    {watchedName || "—"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: TOKENS.inkMuted, textTransform: "capitalize" }}
                  >
                    {watchedGender ? watchedGender.toLowerCase() : "Gender not set"}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ borderColor: TOKENS.hairline }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Phone
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                  {watchedPhone || "—"}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Alternate Phone
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                  {watchedAlternatePhone || "—"}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                  Address
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: TOKENS.ink, textAlign: "right", maxWidth: "60%" }}
                >
                  {watchedAddress || "—"}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default EditCustomer;