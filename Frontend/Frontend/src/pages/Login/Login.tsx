import {
  Box,
  Paper,
  Typography,
  Stack,
  Link,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { useState } from "react";

import SubmitButton from "../../components/forms/SubmitButton";
import AppSnackbar from "../../components/common/AppSnackbar";

import { loginSchema } from "../../validation/auth/login.schema";
import type { LoginFormData } from "../../types/auth";
import { loginUser } from "../../services/auth.service";

// =========================
// DESIGN TOKENS
// Same editorial palette used across the whole app —
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

const Login = () => {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
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
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
  resolver: yupResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);

      setSnackbar({
        open: true,
        message: response.message,
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Login Failed",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: TOKENS.canvas,
      }}
    >
      {/* =========================
          BRAND PANEL
      ========================= */}

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          width: "42%",
          minHeight: "100vh",
          bgcolor: TOKENS.ink,
          color: TOKENS.surface,
          p: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -120,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              bgcolor: TOKENS.brass,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckroomRoundedIcon sx={{ fontSize: 20, color: TOKENS.ink }} />
          </Box>
          <Typography fontWeight={700} letterSpacing={0.5}>
            Tailor Shop
          </Typography>
        </Stack>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{ color: TOKENS.brass, fontWeight: 700, letterSpacing: 1.4 }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ letterSpacing: -0.5, mt: 1, mb: 2, maxWidth: 380 }}
          >
            Sign in to your workshop
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.65)", maxWidth: 360 }}>
            Pick up right where you left off — customers, orders, and
            payments, all in one dashboard.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <AutoAwesomeRoundedIcon sx={{ fontSize: 16, color: TOKENS.brass }} />
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Trusted by workshops for order &amp; billing management
          </Typography>
        </Stack>
      </Box>

      {/* =========================
          FORM PANEL
      ========================= */}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 420,
            p: { xs: 3, sm: 4.5 },
            borderRadius: TOKENS.radius,
            border: "1px solid",
            borderColor: TOKENS.hairline,
            boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: TOKENS.brass, fontWeight: 700, letterSpacing: 1.4 }}
                >
                  Sign In
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
                >
                  Welcome back
                </Typography>

                <Typography color="text.secondary" mt={0.5}>
                  Enter your credentials to continue
                </Typography>
              </Box>

              <Stack spacing={2.5}>
                <TextField
                  label="Email"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Stack>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                sx={{
                  bgcolor: TOKENS.ink,
                  borderRadius: 2,
                  fontWeight: 600,
                  boxShadow: "none",
                  py: 1.1,
                  "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
                }}
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </SubmitButton>

              <Divider sx={{ borderColor: TOKENS.hairline }} />

              <Typography variant="body2" textAlign="center" sx={{ color: TOKENS.inkMuted }}>
                Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{ color: TOKENS.brass, fontWeight: 700, textDecorationColor: TOKENS.brass }}
                >
                  Register
                </Link>
              </Typography>
            </Stack>
          </Box>
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

export default Login; 