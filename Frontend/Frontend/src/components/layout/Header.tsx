import { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  ListItemIcon,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";

const ACCENT = "#9C7A2E";
const TEXT_PRIMARY = "#1C1B29";
const TEXT_SECONDARY = "#8A8896";
const BORDER = "#E7E5EE";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: TEXT_PRIMARY,
        borderBottom: `1px solid ${BORDER}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 60, sm: 64, md: 68 },
          height: { xs: 60, sm: 64, md: 68 },
          px: { xs: 1.5, sm: 2, md: 3 },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 }, minWidth: 0 }}>
          <Tooltip title="Menu">
            <IconButton
              size="small"
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                color: TEXT_SECONDARY,
                borderRadius: 2,
                flexShrink: 0,
                transition: "background-color 150ms ease",
                "&:hover": { bgcolor: "#F7F6F9" },
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: { xs: 16, sm: 18 },
                fontWeight: 800,
                lineHeight: 1.2,
                color: TEXT_PRIMARY,
                whiteSpace: "nowrap",
              }}
            >
              Tailor Shop
            </Typography>
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: 12,
                color: TEXT_SECONDARY,
                mt: 0.25,
                whiteSpace: "nowrap",
              }}
            >
              Management Dashboard
            </Typography>
          </Box>
        </Box>

        {/* CENTER — SEARCH */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
            flex: 1,
            maxWidth: 360,
            bgcolor: "#F7F6F9",
            border: "1px solid transparent",
            borderRadius: 2,
            px: 1.5,
            py: 0.75,
            transition: "border-color 150ms ease, background-color 150ms ease",
            "&:focus-within": {
              bgcolor: "#ffffff",
              borderColor: ACCENT,
            },
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 19, color: TEXT_SECONDARY }} />
          <InputBase
            placeholder="Search orders, customers…"
            sx={{
              fontSize: 13.5,
              width: "100%",
              color: TEXT_PRIMARY,
              "& input::placeholder": { color: TEXT_SECONDARY, opacity: 1 },
            }}
          />
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 }, flexShrink: 0 }}>
          <Tooltip title="Search">
            <IconButton
              sx={{
                display: { xs: "inline-flex", md: "none" },
                width: 36,
                height: 36,
                color: TEXT_SECONDARY,
                borderRadius: 2,
                "&:hover": { bgcolor: "#F7F6F9" },
              }}
            >
              <SearchRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                color: TEXT_SECONDARY,
                borderRadius: 2,
                transition: "background-color 150ms ease",
                "&:hover": { bgcolor: "#F7F6F9" },
              }}
            >
              <Badge
                variant="dot"
                sx={{
                  "& .MuiBadge-dot": {
                    bgcolor: "#C0392B",
                    top: 2,
                    right: 2,
                  },
                }}
              >
                <NotificationsNoneRoundedIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 28, alignSelf: "center", borderColor: BORDER, display: { xs: "none", sm: "block" } }}
          />

          {/* USER */}
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0, sm: 1 },
              cursor: "pointer",
              px: { xs: 0, sm: 1 },
              py: 0.5,
              borderRadius: 2,
              transition: "background-color 150ms ease",
              bgcolor: menuOpen ? "#F7F6F9" : "transparent",
              "&:hover": { bgcolor: "#F7F6F9" },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                bgcolor: ACCENT,
                color: "#ffffff",
                fontSize: { xs: 13, sm: 14 },
                fontWeight: 700,
              }}
            >
              U
            </Avatar>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.3 }}>
                User
              </Typography>
              <Typography sx={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.3 }}>
                Admin
              </Typography>
            </Box>

            <KeyboardArrowDownRoundedIcon
              sx={{
                fontSize: 18,
                color: TEXT_SECONDARY,
                display: { xs: "none", sm: "block" },
                transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 150ms ease",
              }}
            />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1,
                minWidth: 180,
                border: `1px solid ${BORDER}`,
                borderRadius: 2,
                boxShadow: "0 8px 24px rgba(28,27,41,0.08)",
              },
            }}
          >
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: 13.5, py: 1.1, gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32, color: TEXT_SECONDARY }}>
                <PersonOutlineRoundedIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: 13.5, py: 1.1, gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32, color: TEXT_SECONDARY }}>
                <SettingsRoundedIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider sx={{ borderColor: BORDER, my: 0.5 }} />
            <MenuItem
              onClick={handleLogout}
              sx={{
                fontSize: 13.5,
                py: 1.1,
                gap: 0.5,
                color: "#C0392B",
                "&:hover": { bgcolor: "#FDECEC" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "#C0392B" }}>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;