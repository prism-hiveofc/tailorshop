import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";

import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";

const ACCENT = "#9C7A2E";
const ACCENT_SOFT = "#F7F0DE";
const TEXT_PRIMARY = "#1C1B29";
const TEXT_SECONDARY = "#8A8896";
const BORDER = "#E7E5EE";
const DRAWER_WIDTH = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar = ({ mobileOpen, onMobileClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Customers", icon: <PeopleIcon />, path: "/customers" },
    { label: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
    { label: "Payments", icon: <PaymentsIcon />, path: "/payments" },
    { label: "Reports", icon: <AssessmentIcon />, path: "/reports" },
    { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleNavigate = (path: string) => {
    navigate(path);
    onMobileClose();
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: "100%",
        bgcolor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* BRAND */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 2.5, py: 2.25 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ContentCutRoundedIcon sx={{ fontSize: 17, color: "#ffffff" }} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1.2 }}>
            Tailor Shop
          </Typography>
          <Typography sx={{ fontSize: 10.5, color: TEXT_SECONDARY, letterSpacing: "0.04em" }}>
            WORKSPACE
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: BORDER }} />

      {/* NAV */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Typography
          sx={{
            px: 2.5,
            pt: 2,
            pb: 1,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: TEXT_SECONDARY,
          }}
        >
          MAIN MENU
        </Typography>

        <List sx={{ px: 1.5, py: 0.5 }}>
          {menuItems.map((item) => {
            const active = isActive(item.path);

            return (
              <ListItemButton
                key={item.label}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  mb: 0.5,
                  minHeight: 44,
                  color: active ? ACCENT : TEXT_PRIMARY,
                  bgcolor: active ? ACCENT_SOFT : "transparent",
                  transition: "background-color 150ms ease, color 150ms ease",
                  "&:hover": {
                    bgcolor: active ? ACCENT_SOFT : "#F7F6F9",
                  },
                  "&::before": active
                    ? {
                        content: '""',
                        position: "absolute",
                        left: -6,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 18,
                        borderRadius: 2,
                        bgcolor: ACCENT,
                      }
                    : undefined,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: active ? ACCENT : TEXT_SECONDARY,
                    transition: "color 150ms ease",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: BORDER }} />

      {/* LOGOUT */}
      <List sx={{ px: 1.5, py: 1 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            minHeight: 44,
            color: TEXT_PRIMARY,
            transition: "background-color 150ms ease, color 150ms ease",
            "&:hover": {
              bgcolor: "#FDECEC",
              color: "#C0392B",
              "& .MuiListItemIcon-root": { color: "#C0392B" },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: TEXT_SECONDARY, transition: "color 150ms ease" }}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
          />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR — permanent, always visible from md up */}
      <Box
        component="aside"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            width: DRAWER_WIDTH,
            height: "100vh",
            position: "fixed",
            borderRight: `1px solid ${BORDER}`,
          }}
        >
          {sidebarContent}
        </Box>
      </Box>

      {/* MOBILE SIDEBAR — temporary slide-over, hidden from md up */}
      <Drawer
        open={mobileOpen}
        onClose={onMobileClose}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
        slotProps={{
          paper: {
            sx: {
              width: DRAWER_WIDTH,
              border: "none",
              zIndex: (theme) => theme.zIndex.drawer + 2,
            },
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;