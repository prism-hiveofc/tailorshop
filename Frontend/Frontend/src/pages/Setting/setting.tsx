import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Avatar,
  InputAdornment,
  Divider,
  Switch,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { useState } from "react";
import { useForm } from "react-hook-form";

import AppSnackbar from "../../components/common/AppSnackbar";

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
  emerald: "#1E6B4C",
  emeraldSoft: "#E7F3EC",
  ruby: "#A02334",
  rubySoft: "#FBEAEC",
  radius: 3,
};

type SectionKey = "profile" | "shop" | "security" | "notifications" | "danger";

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
};

type ShopFormData = {
  shopName: string;
  address: string;
  currency: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const NAV_ITEMS: {
  key: SectionKey;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: "profile", label: "My Profile", icon: <PersonRoundedIcon fontSize="small" /> },
  { key: "shop", label: "Shop Details", icon: <StorefrontRoundedIcon fontSize="small" /> },
  { key: "security", label: "Security", icon: <LockRoundedIcon fontSize="small" /> },
  { key: "notifications", label: "Notifications", icon: <NotificationsRoundedIcon fontSize="small" /> },
  { key: "danger", label: "Danger Zone", icon: <WarningAmberRoundedIcon fontSize="small" /> },
];

const getInitials = (name: string) =>
  name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

const Settings = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    paymentAlerts: true,
    deliveryReminders: true,
    marketingEmails: false,
  });

  // =========================
  // PROFILE FORM
  // Wire up to your real user/profile service — placeholders below.
  // =========================
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    watch: watchProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      // TODO: replace with your actual service, e.g. await updateProfile(data)
      console.log("UPDATE PROFILE:", data);

      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to update profile",
        severity: "error",
      });
    }
  };

  // =========================
  // SHOP DETAILS FORM
  // =========================
  const {
    register: registerShop,
    handleSubmit: handleShopSubmit,
    formState: { errors: shopErrors, isSubmitting: isShopSubmitting },
  } = useForm<ShopFormData>({
    defaultValues: {
      shopName: "",
      address: "",
      currency: "INR",
    },
  });

  const onShopSubmit = async (data: ShopFormData) => {
    try {
      // TODO: replace with your actual service, e.g. await updateShopSettings(data)
      console.log("UPDATE SHOP:", data);

      setSnackbar({
        open: true,
        message: "Shop details updated successfully",
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to update shop details",
        severity: "error",
      });
    }
  };

  // =========================
  // PASSWORD FORM
  // =========================
  const [passwordError, setPasswordError] = useState("");

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      setPasswordError("");

      if (data.newPassword !== data.confirmPassword) {
        setPasswordError("New password and confirmation do not match");
        return;
      }

      // TODO: replace with your actual service, e.g. await changePassword(data)
      console.log("CHANGE PASSWORD:", data);

      resetPassword();

      setSnackbar({
        open: true,
        message: "Password changed successfully",
        severity: "success",
      });
    } catch (error: any) {
      setPasswordError(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

    // TODO: persist to backend, e.g. await updateNotificationPrefs({ ...notifications, [key]: !notifications[key] })
  };

  const watchedName = watchProfile("name");

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
          Preferences
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
        >
          Settings
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Manage your account, shop, and preferences
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "260px 1fr" }}
        gap={3}
        alignItems="start"
      >
        {/* =========================
            NAV
        ========================= */}

        <Paper
          sx={{
            borderRadius: TOKENS.radius,
            border: "1px solid",
            borderColor: TOKENS.hairline,
            boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
            overflow: "hidden",
            position: { md: "sticky" },
            top: { md: 24 },
          }}
        >
          <List sx={{ py: 1 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.key;
              const isDanger = item.key === "danger";

              return (
                <ListItemButton
                  key={item.key}
                  selected={isActive}
                  onClick={() => setActiveSection(item.key)}
                  sx={{
                    mx: 1,
                    my: 0.25,
                    borderRadius: 2,
                    color: isDanger
                      ? TOKENS.ruby
                      : isActive
                      ? TOKENS.ink
                      : TOKENS.inkMuted,
                    "&.Mui-selected": {
                      bgcolor: isDanger ? TOKENS.rubySoft : TOKENS.brassSoft,
                      "&:hover": {
                        bgcolor: isDanger ? TOKENS.rubySoft : TOKENS.brassSoft,
                      },
                    },
                    "&:hover": {
                      bgcolor: isDanger ? TOKENS.rubySoft : TOKENS.canvas,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 34,
                      color: isDanger
                        ? TOKENS.ruby
                        : isActive
                        ? TOKENS.brass
                        : TOKENS.inkMuted,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 600,
                      fontSize: 14,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Paper>

        {/* =========================
            CONTENT
        ========================= */}

        <Box>
          {/* ---------- PROFILE ---------- */}
          {activeSection === "profile" && (
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
                  <PersonRoundedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
                  My Profile
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2.5} alignItems="center" mb={3.5}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: TOKENS.brassSoft,
                      color: TOKENS.brass,
                      fontWeight: 700,
                      fontSize: 24,
                    }}
                  >
                    {getInitials(watchedName)}
                  </Avatar>
                  <Avatar
                    sx={{
                      position: "absolute",
                      bottom: -2,
                      right: -2,
                      width: 26,
                      height: 26,
                      bgcolor: TOKENS.ink,
                      cursor: "pointer",
                      border: "2px solid",
                      borderColor: TOKENS.surface,
                    }}
                  >
                    <CameraAltRoundedIcon sx={{ fontSize: 13, color: TOKENS.surface }} />
                  </Avatar>
                </Box>

                <Box>
                  <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
                    Profile photo
                  </Typography>
                  <Typography variant="caption" sx={{ color: TOKENS.inkMuted }}>
                    JPG or PNG, at least 200x200px
                  </Typography>
                </Box>
              </Stack>

              <Box
                component="form"
                onSubmit={handleProfileSubmit(onProfileSubmit)}
                display="flex"
                flexDirection="column"
                gap={2.5}
              >
                <TextField
                  label="Full Name"
                  fullWidth
                  {...registerProfile("name", { required: "Name is required" })}
                  error={!!profileErrors.name}
                  helperText={profileErrors.name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
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
                    label="Email"
                    {...registerProfile("email", { required: "Email is required" })}
                    error={!!profileErrors.email}
                    helperText={profileErrors.email?.message}
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
                    label="Phone"
                    {...registerProfile("phone", { required: "Phone is required" })}
                    error={!!profileErrors.phone}
                    helperText={profileErrors.phone?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Box>

                <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isProfileSubmitting}
                    startIcon={<SaveRoundedIcon />}
                    sx={{
                      bgcolor: TOKENS.ink,
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: "none",
                      px: 3,
                      "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
                    }}
                  >
                    {isProfileSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </Box>
              </Box>
            </Paper>
          )}

          {/* ---------- SHOP DETAILS ---------- */}
          {activeSection === "shop" && (
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
                  <StorefrontRoundedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
                  Shop Details
                </Typography>
              </Stack>

              <Box
                component="form"
                onSubmit={handleShopSubmit(onShopSubmit)}
                display="flex"
                flexDirection="column"
                gap={2.5}
              >
                <TextField
                  label="Shop Name"
                  fullWidth
                  placeholder="Eg: Elegant Stitches Tailoring"
                  {...registerShop("shopName", { required: "Shop name is required" })}
                  error={!!shopErrors.shopName}
                  helperText={shopErrors.shopName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CheckroomRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <TextField
                  label="Shop Address"
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Street, area, city, pincode"
                  {...registerShop("address", { required: "Address is required" })}
                  error={!!shopErrors.address}
                  helperText={shopErrors.address?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                        <PlaceRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <TextField
                  label="Currency"
                  fullWidth
                  {...registerShop("currency")}
                  helperText="Used across payments, orders, and reports"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 }, maxWidth: 280 }}
                />

                <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isShopSubmitting}
                    startIcon={<SaveRoundedIcon />}
                    sx={{
                      bgcolor: TOKENS.ink,
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: "none",
                      px: 3,
                      "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
                    }}
                  >
                    {isShopSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </Box>
              </Box>
            </Paper>
          )}

          {/* ---------- SECURITY ---------- */}
          {activeSection === "security" && (
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
                  <LockRoundedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
                  Change Password
                </Typography>
              </Stack>

              <Box
                component="form"
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                display="flex"
                flexDirection="column"
                gap={2.5}
                sx={{ maxWidth: 460 }}
              >
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                  })}
                  error={!!passwordErrors.currentPassword}
                  helperText={passwordErrors.currentPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={!!passwordErrors.newPassword}
                  helperText={passwordErrors.newPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  {...registerPassword("confirmPassword", {
                    required: "Please confirm your new password",
                  })}
                  error={!!passwordErrors.confirmPassword}
                  helperText={passwordErrors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                {passwordError && (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ p: 1.5, borderRadius: 2, bgcolor: TOKENS.rubySoft }}
                  >
                    <ErrorOutlineRoundedIcon sx={{ color: TOKENS.ruby, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: TOKENS.ruby }}>
                      {passwordError}
                    </Typography>
                  </Stack>
                )}

                <Divider sx={{ borderColor: TOKENS.hairline, my: 0.5 }} />

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isPasswordSubmitting}
                    startIcon={<SaveRoundedIcon />}
                    sx={{
                      bgcolor: TOKENS.ink,
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: "none",
                      px: 3,
                      "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
                    }}
                  >
                    {isPasswordSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                </Box>
              </Box>
            </Paper>
          )}

          {/* ---------- NOTIFICATIONS ---------- */}
          {activeSection === "notifications" && (
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
                  <NotificationsRoundedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
                  Notification Preferences
                </Typography>
              </Stack>

              <Stack spacing={0}>
                {[
                  {
                    key: "orderUpdates" as const,
                    title: "Order Updates",
                    description: "Get notified when an order's status changes",
                  },
                  {
                    key: "paymentAlerts" as const,
                    title: "Payment Alerts",
                    description: "Get notified when a payment is recorded",
                  },
                  {
                    key: "deliveryReminders" as const,
                    title: "Delivery Reminders",
                    description: "Reminders for orders nearing their delivery date",
                  },
                  {
                    key: "marketingEmails" as const,
                    title: "Marketing Emails",
                    description: "Occasional product tips and updates",
                  },
                ].map((item, index, arr) => (
                  <Box key={item.key}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ py: 2 }}
                    >
                      <Box pr={2}>
                        <Typography fontWeight={600} sx={{ color: TOKENS.ink }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                          {item.description}
                        </Typography>
                      </Box>

                      <Switch
                        checked={notifications[item.key]}
                        onChange={() => handleNotificationToggle(item.key)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: TOKENS.brass,
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            bgcolor: TOKENS.brass,
                          },
                        }}
                      />
                    </Stack>
                    {index < arr.length - 1 && (
                      <Divider sx={{ borderColor: TOKENS.hairline }} />
                    )}
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* ---------- DANGER ZONE ---------- */}
          {activeSection === "danger" && (
            <Paper
              sx={{
                p: 3,
                borderRadius: TOKENS.radius,
                border: "1px solid",
                borderColor: TOKENS.rubySoft,
                boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
                <Avatar
                  sx={{
                    bgcolor: TOKENS.rubySoft,
                    color: TOKENS.ruby,
                    width: 38,
                    height: 38,
                  }}
                >
                  <WarningAmberRoundedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
                  Danger Zone
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                rowGap={2}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: TOKENS.rubySoft,
                }}
              >
                <Box pr={2}>
                  <Typography fontWeight={700} sx={{ color: TOKENS.ruby }}>
                    Delete this account
                  </Typography>
                  <Typography variant="body2" sx={{ color: TOKENS.ruby, opacity: 0.85 }}>
                    Once deleted, all customers, orders, and payment records
                    tied to this account are permanently removed. This cannot
                    be undone.
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: TOKENS.ruby,
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    "&:hover": { bgcolor: "#821A28", boxShadow: "none" },
                  }}
                  onClick={() => {
                    // TODO: wire to a confirmation Dialog + delete-account service,
                    // same Dialog pattern as PaymentList/CustomerList delete flow.
                    console.log("DELETE ACCOUNT CLICKED");
                  }}
                >
                  Delete Account
                </Button>
              </Stack>
            </Paper>
          )}
        </Box>
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

export default Settings;