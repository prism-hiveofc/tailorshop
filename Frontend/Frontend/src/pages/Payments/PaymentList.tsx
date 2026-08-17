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

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getPayments,
  searchPayments,
  deletePayment,
} from "../../services/payment.service";

import type { Payment } from "../../types/payment";
import AppSnackbar from "../../components/common/AppSnackbar";

// =========================
// DESIGN TOKENS
// Same editorial palette used across the Reports page —
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

// Visual mapping only — payment method name/casing is untouched
// in the data itself, this just decides icon + chip color.
const methodStyles: Record<
  string,
  { bg: string; color: string; icon: React.ReactElement }
> = {
  cash: {
    bg: TOKENS.emeraldSoft,
    color: TOKENS.emerald,
    icon: <AccountBalanceWalletRoundedIcon sx={{ fontSize: 15 }} />,
  },
  card: {
    bg: TOKENS.brassSoft,
    color: TOKENS.brass,
    icon: <CreditCardRoundedIcon sx={{ fontSize: 15 }} />,
  },
  upi: {
    bg: "#E7EEF9",
    color: "#2C5AA0",
    icon: <QrCode2RoundedIcon sx={{ fontSize: 15 }} />,
  },
};

const getMethodStyle = (method: string) =>
  methodStyles[method?.toLowerCase()] || {
    bg: "#EFEFF2",
    color: TOKENS.inkMuted,
    icon: <PaymentsRoundedIcon sx={{ fontSize: 15 }} />,
  };

const PaymentList = () => {
  const navigate = useNavigate();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as
      | "success"
      | "error"
      | "warning"
      | "info",
  });

  const loadPayments = async () => {
    try {
      const response = await getPayments();
      setPayments(response.data);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to load payments",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleSearch = async (value: string) => {
    setSearch(value);

    if (!value.trim()) {
      loadPayments();
      return;
    }

    try {
      const response = await searchPayments(value);
      setPayments(response.data);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Payment search failed",
        severity: "error",
      });
    }
  };

  const handleDeleteClick = (paymentId: string) => {
    setDeleteId(paymentId);
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      const response = await deletePayment(deleteId);

      setDeleteId(null);

      setSnackbar({
        open: true,
        message:
          response.message ||
          "Payment deleted successfully",
        severity: "success",
      });

      await loadPayments();
    } catch (error: any) {
      setDeleteId(null);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to delete payment",
        severity: "error",
      });
    }
  };

  const deletingPayment = payments.find(
    (payment) => payment._id === deleteId
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
            Billing
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
          >
            Payments
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Track and manage every order payment
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/payments/add")}
          sx={{
            bgcolor: TOKENS.ink,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: "none",
            px: 2.5,
            "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
          }}
        >
          Add Payment
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
          label="Search payment"
          placeholder="Search by payment method"
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
          PAYMENTS TABLE
      ========================= */}

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
        <Table sx={{ minWidth: 900 }}>
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
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    sx={{ py: 6, color: TOKENS.inkMuted }}
                  >
                    <InboxRoundedIcon sx={{ fontSize: 30, opacity: 0.5 }} />
                    <Typography variant="body2">
                      {search
                        ? "No payments match your search"
                        : "No payments recorded yet"}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => {
                const method = getMethodStyle(payment.paymentMethod);

                return (
                  <TableRow
                    key={payment._id}
                    hover
                    sx={{
                      "& td": {
                        borderColor: TOKENS.hairline,
                      },
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
                          {payment.orderId.orderNumber}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
                        {formatCurrency(payment.amount)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        icon={method.icon}
                        label={payment.paymentMethod}
                        size="small"
                        sx={{
                          bgcolor: method.bg,
                          color: method.color,
                          fontWeight: 700,
                          textTransform: "capitalize",
                          "& .MuiChip-icon": { color: method.color },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: payment.remarks
                            ? TOKENS.inkMuted
                            : "text.disabled",
                          fontStyle: payment.remarks ? "normal" : "italic",
                        }}
                      >
                        {payment.remarks || "No remarks"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
                        {formatDate(payment.createdAt)}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title="Edit payment">
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(
                                `/payments/edit/${payment._id}`
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

                        <Tooltip title="Delete payment">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDeleteClick(payment._id)
                            }
                            sx={{
                              color: TOKENS.ruby,
                              "&:hover": {
                                bgcolor: TOKENS.rubySoft,
                              },
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
              Delete Payment
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
            {deletingPayment
              ? `This will permanently remove the ${formatCurrency(
                  deletingPayment.amount
                )} payment for order ${deletingPayment.orderId.orderNumber}. This action can't be undone.`
              : "Are you sure you want to delete this payment? This action can't be undone."}
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

export default PaymentList;