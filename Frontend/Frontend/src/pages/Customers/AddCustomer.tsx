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

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PhoneForwardedRoundedIcon from "@mui/icons-material/PhoneForwardedRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { CustomerFormData } from "../../types/customer";
import { createCustomer } from "../../services/customer.service";

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

const CustomerAdd = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    defaultValues: {
      name: "",
      phone: "",
      alternatePhone: "",
      gender: "",
      address: "",
    },
  });

  const onSubmit = async (data: CustomerFormData) => {
    try {
      await createCustomer(data);

      navigate("/customers");
    } catch (error) {
      console.error("CREATE CUSTOMER ERROR:", error);
    }
  };

  // Display-only: mirrors the form's live values into a summary
  // card so staff can see the record take shape as they type.
  // Doesn't affect validation or what gets submitted.
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
          Add Customer
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Create a new customer record
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
              <PersonAddRoundedIcon fontSize="small" />
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
              placeholder="Eg: Priya Ramesh"
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
              defaultValue=""
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
              placeholder="Street, area, city"
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
                {isSubmitting ? "Creating..." : "Create Customer"}
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* =========================
            CUSTOMER PREVIEW
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
              <PersonRoundedIcon fontSize="small" />
            </Avatar>
            <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
              Customer Preview
            </Typography>
          </Stack>

          {!watchedName ? (
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
              <PersonAddRoundedIcon sx={{ fontSize: 26, opacity: 0.5 }} />
              <Typography variant="body2" textAlign="center" px={2}>
                Start typing to preview the customer
              </Typography>
            </Stack>
          ) : (
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
                    {watchedName}
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
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomerAdd;