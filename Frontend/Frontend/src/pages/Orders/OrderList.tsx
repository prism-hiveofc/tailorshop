import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
  Stack,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import AppLoader from "../../components/common/AppLoader";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getOrders,
  searchOrders,
  deleteOrder,
} from "../../services/order.service";

import type { Order } from "../../types/order";

// =========================
// DESIGN TOKENS
// Same editorial palette used across Reports and Payments —
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
  ruby: "#A02334",
  rubySoft: "#FBEAEC",
  radius: 3,
};

const formatCurrency = (value: number) =>
  `₹${(value || 0).toLocaleString("en-IN")}`;

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const statusStyles: Record<
  string,
  { bg: string; color: string }
> = {
  pending: { bg: TOKENS.amberSoft, color: TOKENS.amber },
  delivered: { bg: TOKENS.emeraldSoft, color: TOKENS.emerald },
  "in progress": { bg: TOKENS.brassSoft, color: TOKENS.brass },
};

const getStatusStyle = (status: string) =>
  statusStyles[status?.toLowerCase()] || {
    bg: "#EFEFF2",
    color: TOKENS.inkMuted,
  };

const OrderList = () => {
  const navigate = useNavigate();

const [orders, setOrders] = useState<Order[]>([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true); 

  // Replaces the native window.confirm with a styled dialog —
  // same confirm-then-delete flow, just presented consistently
  // with the rest of the app (see PaymentList).
  const [deleteId, setDeleteId] = useState<string | null>(null);

 const loadOrders = async () => {
  try {
    setLoading(true);

    const response = await getOrders();

    setOrders(response.data);
  } catch (error) {
    console.error("ORDERS ERROR:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSearch = async (
    value: string
  ) => {
    setSearch(value);

    if (!value.trim()) {
      loadOrders();
      return;
    }

    try {
      const response = await searchOrders(value);

      setOrders(response.data);
    } catch (error) {
      console.error("SEARCH ORDER ERROR:", error);
    }
  };

  const handleDeleteClick = (orderId: string) => {
    setDeleteId(orderId);
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      await deleteOrder(deleteId);

      setDeleteId(null);

      loadOrders();
    } catch (error) {
      console.error(
        "DELETE ORDER ERROR:",
        error
      );

      setDeleteId(null);
    }
  };

  const deletingOrder = orders.find(
    (order) => order._id === deleteId
  );

  return (
    <Box sx={{ bgcolor: TOKENS.canvas, minHeight: "100%", pb: 4 }}>
      {/* =========================
          HEADER
      ========================= */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={4}
        pb={3}
        gap={2}
        flexWrap="wrap"
        sx={{ borderBottom: "1px solid", borderColor: TOKENS.hairline }}
      >
        <Box>
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
            Orders
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Manage every customer order in one place
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate("/orders/add")
          }
          sx={{
            bgcolor: TOKENS.ink,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: "none",
            px: 2.5,
            "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
          }}
        >
          Add Order
        </Button>
      </Box>

      {/* =========================
          SEARCH
      ========================= */}

      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: TOKENS.radius,
          border: "1px solid",
          borderColor: TOKENS.hairline,
          boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
        }}
      >
        <TextField
          fullWidth
          size="small"
          label="Search order"
          placeholder="Search by order number or customer"
          value={search}
          onChange={(event) =>
            handleSearch(event.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: TOKENS.inkMuted, fontSize: 20 }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 2, bgcolor: TOKENS.canvas },
          }}
        />
      </Paper>

      {/* =========================
          ORDERS TABLE
      ========================= */}
{loading ? (
  <AppLoader message="Loading orders..." />
) : (
  <TableContainer
    component={Paper}
    sx={{
      borderRadius: TOKENS.radius,
      border: "1px solid",
      borderColor: TOKENS.hairline,
      boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
      overflowX: "auto",
    }}
  >
    <Table sx={{ minWidth: 1100 }}>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: TOKENS.radius,
          border: "1px solid",
          borderColor: TOKENS.hairline,
          boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 1100 }}>
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
                  whiteSpace: "nowrap",
                },
              }}
            >
              <TableCell>Order Number</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Dress Type</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Advance</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    sx={{ py: 6, color: TOKENS.inkMuted }}
                  >
                    <InboxRoundedIcon sx={{ fontSize: 30, opacity: 0.5 }} />
                    <Typography variant="body2">
                      {search
                        ? "No orders match your search"
                        : "No orders yet — create your first one"}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => {
                const status = getStatusStyle(order.status);

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
                            width: 32,
                            height: 32,
                            borderRadius: 1.5,
                            bgcolor: TOKENS.canvas,
                            color: TOKENS.ink,
                          }}
                        >
                          <ReceiptLongRoundedIcon sx={{ fontSize: 16 }} />
                        </Avatar>

                        <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
                          {order.orderNumber}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: TOKENS.ink }}>
                        {order.customerId.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <StyleRoundedIcon sx={{ fontSize: 15, color: TOKENS.inkMuted }} />
                        <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                          {order.dressType}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                        {formatDate(order.deliveryDate)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: TOKENS.ink }}>
                        {order.quantity}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight={600} sx={{ color: TOKENS.ink }}>
                        {formatCurrency(order.totalAmount)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                        {formatCurrency(order.advanceAmount)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          color:
                            order.balanceAmount > 0
                              ? TOKENS.amber
                              : TOKENS.emerald,
                        }}
                      >
                        {formatCurrency(order.balanceAmount)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          bgcolor: status.bg,
                          color: status.color,
                          fontWeight: 700,
                          textTransform: "capitalize",
                        }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title="Edit order">
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(
                                `/orders/edit/${order._id}`
                              )
                            }
                            sx={{
                              color: TOKENS.inkMuted,
                              "&:hover": {
                                color: TOKENS.ink,
                                bgcolor: TOKENS.canvas,
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete order">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDeleteClick(order._id)
                            }
                            sx={{
                              color: TOKENS.ruby,
                              "&:hover": { bgcolor: TOKENS.rubySoft },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
</Table>
</TableContainer>
)}
      {/* =========================
          DELETE CONFIRMATION
      ========================= */}

      <Dialog
        open={Boolean(deleteId)}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                bgcolor: TOKENS.rubySoft,
                color: TOKENS.ruby,
                width: 40,
                height: 40,
              }}
            >
              <WarningAmberRoundedIcon />
            </Avatar>
            <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
              Delete Order
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
            {deletingOrder
              ? `This will permanently remove order ${deletingOrder.orderNumber} for ${deletingOrder.customerId.name}. This action can't be undone.`
              : "Are you sure you want to delete this order? This action can't be undone."}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={handleDeleteCancel}
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            sx={{
              bgcolor: TOKENS.ruby,
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { bgcolor: "#821A28", boxShadow: "none" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderList;