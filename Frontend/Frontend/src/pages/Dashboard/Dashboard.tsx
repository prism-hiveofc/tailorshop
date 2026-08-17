import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

import { useEffect, useState } from "react";

import {
  getDashboard,
  getRecentOrders,
} from "../../services/dashboard.service";

import StatCard from "./StatCard";
import RecentOrders from "./RecentOrders";

const TOKENS = {
  ink: "#1C1B29",
  inkMuted: "#5B5A6B",
  hairline: "#E7E5EE",
  canvas: "#F7F6F9",
  brass: "#9C7A2E",
  brassSoft: "#F6EFDE",
  emerald: "#1E6B4C",
  emeraldSoft: "#E7F3EC",
  amber: "#A05A00",
  amberSoft: "#FBEEDD",
  ruby: "#A02334",
  rubySoft: "#FBEAEC",
  sapphire: "#2C5AA0",
  sapphireSoft: "#E7EEF9",
  radius: 3,
};

type DashboardData = {
  totalCustomers: number;
  totalOrders: number;
  totalPayments: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
};

type Order = {
  _id: string;
  orderNumber: string;
  customerId: {
    name: string;
    phone: string;
  };
  dressType: string;
  totalAmount: number;
  status: string;
  deliveryDate: string;
};

const formatCurrency = (value: number) =>
  `₹${(value || 0).toLocaleString("en-IN")}`;

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardResponse = await getDashboard();
      const ordersResponse = await getRecentOrders();

      setDashboard(dashboardResponse.data);
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ bgcolor: TOKENS.canvas, minHeight: "100%", pb: 4 }}>
      <Box
        mb={4}
        pb={3}
        sx={{ borderBottom: "1px solid", borderColor: TOKENS.hairline }}
      >
        <Typography
          variant="overline"
          sx={{ color: TOKENS.brass, fontWeight: 700, letterSpacing: 1.4 }}
        >
          Overview
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
        >
          Dashboard
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Welcome back! Here's what's happening today.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            title="Total Customers"
            value={dashboard?.totalCustomers ?? 0}
            icon={<PeopleRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg={TOKENS.brassSoft}
            iconColor={TOKENS.brass}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            title="Total Orders"
            value={dashboard?.totalOrders ?? 0}
            icon={<ShoppingBagRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg={TOKENS.sapphireSoft}
            iconColor={TOKENS.sapphire}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            title="Total Payments"
            value={dashboard?.totalPayments ?? 0}
            icon={<PaymentsRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg={TOKENS.amberSoft}
            iconColor={TOKENS.amber}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            title="Pending Orders"
            value={dashboard?.pendingOrders ?? 0}
            icon={<PendingActionsRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg={TOKENS.rubySoft}
            iconColor={TOKENS.ruby}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            title="Total Revenue"
            value={formatCurrency(dashboard?.totalRevenue ?? 0)}
            icon={<CurrencyRupeeRoundedIcon sx={{ fontSize: 20 }} />}
            iconBg={TOKENS.emeraldSoft}
            iconColor={TOKENS.emerald}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Paper
          sx={{
            borderRadius: TOKENS.radius,
            border: "1px solid",
            borderColor: TOKENS.hairline,
            boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              px: 3,
              py: 2.25,
              borderBottom: "1px solid",
              borderColor: TOKENS.hairline,
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: TOKENS.canvas,
                color: TOKENS.ink,
                width: 34,
                height: 34,
                borderRadius: 1.5,
              }}
            >
              <TaskAltRoundedIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
              Recent Orders
            </Typography>
          </Stack>

          <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
            <RecentOrders orders={orders} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;