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
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCustomers,
  searchCustomers,
  deleteCustomer,
} from "../../services/customer.service";

import type { Customer } from "../../types/customer";
import AppSnackbar from "../../components/common/AppSnackbar";

// =========================
// DESIGN TOKENS
// Same editorial palette used across Reports, Payments and Orders —
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

const getInitials = (name: string) =>
  name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

const CustomerList = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
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

  const loadCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to load customers",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSearch = async (value: string) => {
    setSearch(value);

    if (!value.trim()) {
      loadCustomers();
      return;
    }

    try {
      const response = await searchCustomers(value);
      setCustomers(response.data);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Customer search failed",
        severity: "error",
      });
    }
  };

  const handleDeleteClick = (customerId: string) => {
    setDeleteId(customerId);
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      await deleteCustomer(deleteId);

      setDeleteId(null);

      setSnackbar({
        open: true,
        message: "Customer deleted successfully",
        severity: "success",
      });

      await loadCustomers();
    } catch (error: any) {
      setDeleteId(null);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to delete customer",
        severity: "error",
      });
    }
  };

  const deletingCustomer = customers.find(
    (customer) => customer._id === deleteId
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
            Directory
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
          >
            Customers
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Manage your customer records
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/customers/add")}
          sx={{
            bgcolor: TOKENS.ink,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: "none",
            px: 2.5,
            "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
          }}
        >
          Add Customer
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
          label="Search customer"
          placeholder="Search by name or phone"
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
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
          CUSTOMERS TABLE
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
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Alternate Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    sx={{ py: 6, color: TOKENS.inkMuted }}
                  >
                    <InboxRoundedIcon sx={{ fontSize: 30, opacity: 0.5 }} />
                    <Typography variant="body2">
                      {search
                        ? "No customers match your search"
                        : "No customers found"}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow
                  key={customer._id}
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
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: TOKENS.brassSoft,
                          color: TOKENS.brass,
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>

                      <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
                        {customer.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <PhoneRoundedIcon sx={{ fontSize: 15, color: TOKENS.inkMuted }} />
                      <Typography variant="body2" sx={{ color: TOKENS.ink }}>
                        {customer.phone}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: customer.alternatePhone
                          ? TOKENS.inkMuted
                          : "text.disabled",
                        fontStyle: customer.alternatePhone ? "normal" : "italic",
                      }}
                    >
                      {customer.alternatePhone || "Not provided"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ color: TOKENS.inkMuted, textTransform: "capitalize" }}
                    >
                      {customer.gender?.toLowerCase()}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      icon={<PersonRoundedIcon sx={{ fontSize: 15 }} />}
                      label={customer.status ? "Active" : "Inactive"}
                      size="small"
                      sx={{
                        bgcolor: customer.status
                          ? TOKENS.emeraldSoft
                          : "#EFEFF2",
                        color: customer.status
                          ? TOKENS.emerald
                          : TOKENS.inkMuted,
                        fontWeight: 700,
                        "& .MuiChip-icon": {
                          color: customer.status
                            ? TOKENS.emerald
                            : TOKENS.inkMuted,
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ maxWidth: 220 }}>
                    <Stack direction="row" spacing={0.75} alignItems="flex-start">
                      <PlaceRoundedIcon
                        sx={{ fontSize: 15, color: TOKENS.inkMuted, mt: "2px" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: TOKENS.inkMuted,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {customer.address}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="Edit customer">
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(`/customers/${customer._id}/edit`)
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

                      <Tooltip title="Delete customer">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(customer._id)}
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
              ))
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
              Delete Customer
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
            {deletingCustomer
              ? `This will permanently remove ${deletingCustomer.name} and their record from your customer list. This action can't be undone.`
              : "Are you sure you want to delete this customer? This action can't be undone."}
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

export default CustomerList;