import React from "react";
import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";

import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

// =========================
// DESIGN TOKENS
// Same editorial palette used across the whole app —
// charcoal ink + muted brass accent — kept consistent here.
// =========================
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
  sapphire: "#2C5AA0",
  sapphireSoft: "#E7EEF9",
};

type Customer = {
  name: string;
  phone: string;
};

type Order = {
  _id: string;
  orderNumber: string;
  customerId: Customer;
  dressType: string;
  totalAmount: number;
  status: string;
  deliveryDate: string;
};

type RecentOrdersProps = {
  orders: Order[];
};

const formatCurrency = (value: number) =>
  `₹${(value || 0).toLocaleString("en-IN")}`;

const STATUS_META: Record<
  string,
  {
    label: string;
    color: string;
    bg: string;
    icon: React.ReactElement;
  }
> = {
  PENDING: {
    label: "Pending",
    color: TOKENS.amber,
    bg: TOKENS.amberSoft,
    icon: <FlagRoundedIcon sx={{ fontSize: 14 }} />,
  },
  CUTTING: {
    label: "Cutting",
    color: TOKENS.sapphire,
    bg: TOKENS.sapphireSoft,
    icon: <ContentCutRoundedIcon sx={{ fontSize: 14 }} />,
  },
  STITCHING: {
    label: "Stitching",
    color: TOKENS.brass,
    bg: TOKENS.brassSoft,
    icon: <CheckroomRoundedIcon sx={{ fontSize: 14 }} />,
  },
  READY: {
    label: "Ready",
    color: TOKENS.emerald,
    bg: TOKENS.emeraldSoft,
    icon: <Inventory2RoundedIcon sx={{ fontSize: 14 }} />,
  },
  DELIVERED: {
    label: "Delivered",
    color: TOKENS.inkMuted,
    bg: "#EFEFF2",
    icon: <LocalShippingRoundedIcon sx={{ fontSize: 14 }} />,
  },
  COMPLETED: {
    label: "Completed",
    color: TOKENS.emerald,
    bg: TOKENS.emeraldSoft,
    icon: <TaskAltRoundedIcon sx={{ fontSize: 14 }} />,
  },
};

const getStatusMeta = (status: string) =>
  STATUS_META[status?.toUpperCase()] || {
    label: status || "Unknown",
    color: TOKENS.inkMuted,
    bg: "#EFEFF2",
    icon: <FlagRoundedIcon sx={{ fontSize: 14 }} />,
  };

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                bgcolor: TOKENS.canvas,
                color: TOKENS.inkMuted,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                borderBottom: "1px solid",
                borderColor: TOKENS.hairline,
              },
            }}
          >
            <TableCell>Order</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Dress</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Delivery</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  sx={{ py: 5, color: TOKENS.inkMuted }}
                >
                  <InboxRoundedIcon sx={{ fontSize: 28, opacity: 0.5 }} />
                  <Typography variant="body2">No orders found</Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ) : (
            orders.slice(0, 5).map((order) => {
              const statusMeta = getStatusMeta(order.status);

              return (
                <TableRow
                  key={order._id}
                  hover
                  sx={{
                    "& td": { borderColor: TOKENS.hairline },
                    "&:last-of-type td": { borderBottom: "none" },
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: 1.5,
                          bgcolor: TOKENS.canvas,
                          color: TOKENS.ink,
                        }}
                      >
                        <ReceiptLongRoundedIcon sx={{ fontSize: 15 }} />
                      </Avatar>
                      <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
                        {order.orderNumber}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: TOKENS.ink }}>
                      {order.customerId?.name || "—"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                      {order.dressType}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
                      {formatCurrency(order.totalAmount)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      icon={statusMeta.icon}
                      label={statusMeta.label}
                      size="small"
                      sx={{
                        bgcolor: statusMeta.bg,
                        color: statusMeta.color,
                        fontWeight: 700,
                        "& .MuiChip-icon": { color: statusMeta.color },
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                      {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentOrders;