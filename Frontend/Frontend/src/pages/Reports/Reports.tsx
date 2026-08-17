import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Avatar,
  Stack,
  Grid,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

import { useEffect, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";

import { getCustomers } from "../../services/customer.service";

import {
  getDailyRevenue,
  getDeliveredOrders,
  getMonthlyRevenue,
  getPendingOrders,
  getCustomerOrderHistory,
  getDateRangeOrders,
} from "../../services/report.service";

import type { Customer } from "../../types/customer";
import type { ReportOrder } from "../../types/report";

// =========================
// DESIGN TOKENS
// A restrained, editorial palette for a tailoring business:
// charcoal ink for authority, a single muted brass accent for craft.
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

// Shared surface treatment for every card on the page —
// keeps borders, radius and shadow consistent across sections.
const sectionCardSx = {
  borderRadius: TOKENS.radius,
  border: "1px solid",
  borderColor: TOKENS.hairline,
  boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
};

const Reports = () => {
  // =========================
  // DAILY REPORT DATE
  // =========================

  const [date, setDate] = useState<Dayjs>(dayjs());

  // =========================
  // DATE RANGE
  // =========================

  const [dateRangeOpen, setDateRangeOpen] =
    useState(false);

  const [fromDate, setFromDate] =
    useState<Dayjs | null>(null);

  const [toDate, setToDate] =
    useState<Dayjs | null>(null);

  const [dateRangeOrders, setDateRangeOrders] =
    useState<ReportOrder[]>([]);

  // =========================
  // REVENUE
  // =========================

  const [dailyRevenue, setDailyRevenue] =
    useState(0);

  const [dailyPayments, setDailyPayments] =
    useState(0);

  const [monthlyRevenue, setMonthlyRevenue] =
    useState(0);

  const [monthlyPayments, setMonthlyPayments] =
    useState(0);

  // =========================
  // ORDERS
  // =========================

  const [pendingOrders, setPendingOrders] =
    useState<ReportOrder[]>([]);

  const [deliveredOrders, setDeliveredOrders] =
    useState<ReportOrder[]>([]);

  // =========================
  // CUSTOMERS
  // =========================

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState("");

  const [customerOrders, setCustomerOrders] =
    useState<ReportOrder[]>([]);

  // =========================
  // DAILY REVENUE
  // =========================

  useEffect(() => {
    loadDailyRevenue();
  }, [date]);

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadMonthlyRevenue();
    loadPendingOrders();
    loadDeliveredOrders();
    loadCustomers();
  }, []);

  // =========================
  // DAILY REVENUE
  // =========================

  const loadDailyRevenue = async () => {
    try {
      const response = await getDailyRevenue(
        date.format("YYYY-MM-DD")
      );

      const data = response.data?.[0];

      setDailyRevenue(
        data?.totalRevenue || 0
      );

      setDailyPayments(
        data?.totalPayments || 0
      );
    } catch (error) {
      console.error(
        "DAILY REVENUE ERROR:",
        error
      );
    }
  };

  // =========================
  // MONTHLY REVENUE
  // =========================

  const loadMonthlyRevenue = async () => {
    try {
      const response =
        await getMonthlyRevenue();

      const data = response.data?.[0];

      setMonthlyRevenue(
        data?.totalRevenue || 0
      );

      setMonthlyPayments(
        data?.totalPayments || 0
      );
    } catch (error) {
      console.error(
        "MONTHLY REVENUE ERROR:",
        error
      );
    }
  };

  // =========================
  // PENDING ORDERS
  // =========================

  const loadPendingOrders = async () => {
    try {
      const response =
        await getPendingOrders();

      setPendingOrders(
        response.data || []
      );
    } catch (error) {
      console.error(
        "PENDING ORDERS ERROR:",
        error
      );
    }
  };

  // =========================
  // DELIVERED ORDERS
  // =========================

  const loadDeliveredOrders =
    async () => {
      try {
        const response =
          await getDeliveredOrders();

        setDeliveredOrders(
          response.data || []
        );
      } catch (error) {
        console.error(
          "DELIVERED ORDERS ERROR:",
          error
        );
      }
    };

  // =========================
  // CUSTOMERS
  // =========================

  const loadCustomers = async () => {
    try {
      const response =
        await getCustomers();

      setCustomers(
        response.data || []
      );
    } catch (error) {
      console.error(
        "CUSTOMERS ERROR:",
        error
      );
    }
  };

  // =========================
  // CUSTOMER HISTORY
  // =========================

  const loadCustomerHistory =
    async (
      customerId: string
    ) => {
      if (!customerId) {
        setCustomerOrders([]);
        return;
      }

      try {
        const response =
          await getCustomerOrderHistory(
            customerId
          );

        setCustomerOrders(
          response.data || []
        );
      } catch (error) {
        console.error(
          "CUSTOMER HISTORY ERROR:",
          error
        );

        setCustomerOrders([]);
      }
    };

  // =========================
  // CUSTOMER CHANGE
  // =========================

  const handleCustomerChange =
    (
      event: {
        target: {
          value: string;
        };
      }
    ) => {
      const customerId =
        event.target.value;

      setSelectedCustomer(
        customerId
      );

      loadCustomerHistory(
        customerId
      );
    };

  // =========================
  // OPEN DATE RANGE
  // =========================

  const handleOpenDateRange =
    () => {
      setDateRangeOpen(true);
    };

  // =========================
  // CLOSE DATE RANGE
  // =========================

  const handleCloseDateRange =
    () => {
      setDateRangeOpen(false);
    };

  // =========================
  // SEARCH DATE RANGE
  // =========================

  const loadDateRangeOrders = async () => {
    if (!fromDate || !toDate) {
      return;
    }

    if (fromDate.isAfter(toDate, "day")) {
      return;
    }

    // Close popup immediately
    setDateRangeOpen(false);

    try {
      const response = await getDateRangeOrders(
        fromDate.format("YYYY-MM-DD"),
        toDate.format("YYYY-MM-DD")
      );

      setDateRangeOrders(response.data || []);
    } catch (error) {
      console.error("DATE RANGE ORDERS ERROR:", error);
      setDateRangeOrders([]);
    }
  };

  // =========================
  // CLEAR DATE RANGE
  // =========================

  const clearDateRange = () => {
    setFromDate(null);
    setToDate(null);
    setDateRangeOrders([]);
  };

  // =========================
  // DATE RANGE VALIDATION
  // =========================

  const dateRangeInvalid =
    Boolean(
      fromDate &&
        toDate &&
        fromDate.isAfter(
          toDate,
          "day"
        )
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
        {/* LEFT */}

        <Box>
          <Typography
            variant="overline"
            sx={{
              color: TOKENS.brass,
              fontWeight: 700,
              letterSpacing: 1.4,
            }}
          >
            Business Overview
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: TOKENS.ink, letterSpacing: -0.5, mt: 0.25 }}
          >
            Reports
          </Typography>

          <Typography
            color="text.secondary"
            mt={0.5}
          >
            Revenue, orders and customer history in one place
          </Typography>
        </Box>

        {/* RIGHT */}

        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          flexWrap="wrap"
          justifyContent="flex-end"
        >
          {/* DAILY DATE */}

          <DatePicker
            label="Report Date"
            value={date}
            onChange={(newDate) => {
              if (newDate) {
                setDate(newDate);
              }
            }}
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  bgcolor: TOKENS.surface,
                  borderRadius: 2,
                  minWidth: 190,
                },
              },
            }}
          />

          {/* DATE RANGE */}

          <Button
            variant="outlined"
            startIcon={<DateRangeRoundedIcon />}
            onClick={
              handleOpenDateRange
            }
            sx={{
              minHeight: 40,
              whiteSpace: "nowrap",
              color: TOKENS.ink,
              borderColor: TOKENS.hairline,
              bgcolor: TOKENS.surface,
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": {
                borderColor: TOKENS.ink,
                bgcolor: TOKENS.surface,
              },
            }}
          >
            Date Range Orders
          </Button>
        </Box>
      </Box>

      {/* =========================
          REVENUE
      ========================= */}

      <Grid container spacing={2.5} mb={2.5}>
       <Grid size={{ xs: 12, md: 6 }}>
          <RevenueCard
            icon={<CalendarMonthRoundedIcon />}
            label="Daily Revenue"
            amount={formatCurrency(dailyRevenue)}
            caption={`${dailyPayments} payment${
              dailyPayments === 1 ? "" : "s"
            } · ${date.format("DD MMM YYYY")}`}
          />
        </Grid>

       <Grid size={{ xs: 12, md: 6 }}>
          <RevenueCard
            icon={<PaymentsRoundedIcon />}
            label="Monthly Revenue"
            amount={formatCurrency(monthlyRevenue)}
            caption={`${monthlyPayments} payment${
              monthlyPayments === 1 ? "" : "s"
            } this month`}
            accent
          />
        </Grid>
      </Grid>

      {/* =========================
          CUSTOMER FILTER
      ========================= */}

      <Card sx={{ ...sectionCardSx, mb: 2.5 }}>
        <CardContent sx={{ p: 3 }}>
          <SectionHeading
            icon={<PersonSearchRoundedIcon />}
            title="Customer Order History"
            subtitle="Pick a customer to see everything they've ordered from you."
          />

          <FormControl
            fullWidth
            size="small"
            sx={{ mt: 2.5, maxWidth: 480 }}
          >
            <InputLabel>
              Select Customer
            </InputLabel>

            <Select
              value={
                selectedCustomer
              }
              label="Select Customer"
              onChange={
                handleCustomerChange
              }
              sx={{ borderRadius: 2, bgcolor: TOKENS.canvas }}
            >
              <MenuItem value="">
                Select customer
              </MenuItem>

              {customers.map(
                (customer) => (
                  <MenuItem
                    key={
                      customer._id
                    }
                    value={
                      customer._id
                    }
                  >
                    {customer.name}
                    {" — "}
                    {customer.phone}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {!selectedCustomer ? (
            <Box mt={2.5}>
              <EmptyState text="Select a customer above to view their order history" />
            </Box>
          ) : customerOrders.length ===
            0 ? (
            <Box mt={2.5}>
              <EmptyState text="No orders found for this customer" />
            </Box>
          ) : (
            <Grid container spacing={2} mt={0.25}>
              {customerOrders.map(
                (order) => (
                  <Grid size={{ xs: 12, md: 6 }} key={order._id}>
                    <OrderTicket
                      title={order.orderNumber}
                      status={order.status}
                      rows={[
                        { label: "Dress", value: order.dressType },
                        { label: "Quantity", value: order.quantity },
                        { label: "Total", value: formatCurrency(order.totalAmount) },
                        { label: "Advance", value: formatCurrency(order.advanceAmount) },
                        {
                          label: "Balance",
                          value: formatCurrency(order.balanceAmount),
                          accent:
                            order.balanceAmount > 0
                              ? TOKENS.amber
                              : TOKENS.emerald,
                        },
                        { label: "Delivery Date", value: formatDate(order.deliveryDate) },
                      ]}
                    />
                  </Grid>
                )
              )}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* =========================
          PENDING / DELIVERED ORDERS
      ========================= */}

      <Grid container spacing={2.5} mb={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ ...sectionCardSx, height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <SectionHeading
                icon={<Inventory2RoundedIcon />}
                title="Pending Orders"
                count={pendingOrders.length}
                countColor={TOKENS.amber}
                countBg={TOKENS.amberSoft}
              />

              <Stack spacing={1.5} mt={2.5}>
                {pendingOrders.length === 0 ? (
                  <EmptyState text="No pending orders right now" />
                ) : (
                  pendingOrders.map((order) => (
                    <OrderRow key={order._id} order={order} type="pending" />
                  ))
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

       <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ ...sectionCardSx, height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <SectionHeading
                icon={<LocalShippingRoundedIcon />}
                title="Delivered Orders"
                count={deliveredOrders.length}
                countColor={TOKENS.emerald}
                countBg={TOKENS.emeraldSoft}
              />

              <Stack spacing={1.5} mt={2.5}>
                {deliveredOrders.length === 0 ? (
                  <EmptyState text="No delivered orders yet" />
                ) : (
                  deliveredOrders.map((order) => (
                    <OrderRow key={order._id} order={order} type="delivered" />
                  ))
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* =========================
          DATE RANGE RESULTS
      ========================= */}

      {dateRangeOrders.length >
        0 && (
        <Card sx={{ ...sectionCardSx, mb: 2.5 }}>
          <CardContent sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={2.5}
              flexWrap="wrap"
              gap={1}
            >
              <SectionHeading
                icon={<ReceiptLongRoundedIcon />}
                title="Date Range Orders"
                subtitle={`${fromDate?.format("DD MMM YYYY")} → ${toDate?.format(
                  "DD MMM YYYY"
                )}  ·  ${dateRangeOrders.length} order${
                  dateRangeOrders.length === 1 ? "" : "s"
                }`}
              />

              <Button
                size="small"
                startIcon={<ClearRoundedIcon />}
                onClick={
                  clearDateRange
                }
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                Clear
              </Button>
            </Box>

            <Grid container spacing={2}>
              {dateRangeOrders.map(
                (order) => (
                 <Grid size={{ xs: 12, md: 6 }} key={order._id}>
                    <OrderTicket
                      title={order.orderNumber}
                      status={order.status}
                      rows={[
                        { label: "Customer", value: order.customerId.name },
                        { label: "Phone", value: order.customerId.phone },
                        { label: "Dress", value: order.dressType },
                        { label: "Quantity", value: order.quantity },
                        { label: "Total", value: formatCurrency(order.totalAmount) },
                        { label: "Order Date", value: formatDate(order.createdAt) },
                      ]}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* =========================
          DATE RANGE DIALOG
      ========================= */}

      <Dialog
        open={dateRangeOpen}
        onClose={
          handleCloseDateRange
        }
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 0.5 }}>
          Select Order Date Range
        </DialogTitle>

        <DialogContent>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={3}
          >
            Choose a start and end date to see every order placed in that window.
          </Typography>

          {/* DATE PICKERS */}

          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
            }}
            gap={2}
          >
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newDate) => {
                setFromDate(newDate);
              }}
              maxDate={
                toDate || undefined
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />

            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newDate) => {
                setToDate(newDate);
              }}
              minDate={
                fromDate || undefined
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
          </Box>

          {/* SELECTED RANGE */}

          {fromDate && toDate && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: TOKENS.hairline,
                backgroundColor: TOKENS.canvas,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <EventAvailableRoundedIcon
                  fontSize="small"
                  sx={{ color: TOKENS.brass }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Selected range
                </Typography>
              </Stack>

              <Typography
                fontWeight={700}
                mt={0.5}
                sx={{ color: TOKENS.ink }}
              >
                {fromDate.format(
                  "DD MMM YYYY"
                )}{" "}
                →{" "}
                {toDate.format(
                  "DD MMM YYYY"
                )}
              </Typography>
            </Box>
          )}

          {dateRangeInvalid && (
            <Typography
              color="error"
              variant="body2"
              mt={2}
            >
              To date must be after the
              from date.
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={
              clearDateRange
            }
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            Clear
          </Button>

          <Button
            onClick={
              handleCloseDateRange
            }
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={
              loadDateRangeOrders
            }
            disabled={
              !fromDate ||
              !toDate ||
              dateRangeInvalid
            }
            sx={{
              bgcolor: TOKENS.ink,
              borderRadius: 2,
              boxShadow: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#0F0E18", boxShadow: "none" },
            }}
          >
            Search Orders
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports;

// =========================
// PRESENTATIONAL HELPERS
// (display-only — no data or business logic here)
// =========================

const RevenueCard = ({
  icon,
  label,
  amount,
  caption,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  amount: string;
  caption: string;
  accent?: boolean;
}) => (
  <Card sx={{ ...sectionCardSx, height: "100%" }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: accent ? TOKENS.brassSoft : TOKENS.canvas,
            color: accent ? TOKENS.brass : TOKENS.ink,
            width: 44,
            height: 44,
            borderRadius: 2,
          }}
        >
          {icon}
        </Avatar>

        <Box flex={1}>
          <Typography
            variant="body2"
            sx={{ color: TOKENS.inkMuted, fontWeight: 600 }}
          >
            {label}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            mt={0.5}
            sx={{ color: TOKENS.ink, letterSpacing: -0.5 }}
          >
            {amount}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: TOKENS.inkMuted }}
            mt={0.75}
          >
            {caption}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const SectionHeading = ({
  icon,
  title,
  subtitle,
  count,
  countColor,
  countBg,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  count?: number;
  countColor?: string;
  countBg?: string;
}) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
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
      {icon}
    </Avatar>

    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" fontWeight={700} sx={{ color: TOKENS.ink }}>
          {title}
        </Typography>

        {typeof count === "number" && (
          <Chip
            label={count}
            size="small"
            sx={{
              bgcolor: countBg,
              color: countColor,
              fontWeight: 700,
              height: 22,
            }}
          />
        )}
      </Stack>

      {subtitle && (
        <Typography variant="body2" color="text.secondary" mt={0.25}>
          {subtitle}
        </Typography>
      )}
    </Box>
  </Stack>
);

const EmptyState = ({ text }: { text: string }) => (
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
    <InboxRoundedIcon sx={{ fontSize: 28, opacity: 0.5 }} />
    <Typography variant="body2">{text}</Typography>
  </Stack>
);

const StatusChip = ({ status }: { status: string }) => {
  const style = getStatusStyle(status);
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 700,
        textTransform: "capitalize",
      }}
    />
  );
};

type TicketRow = {
  label: string;
  value: string | number;
  accent?: string;
};

// A compact, invoice-style ticket used for customer history
// and date-range results — two-column field layout reads like
// a printed order slip, which suits a tailoring business.
const OrderTicket = ({
  title,
  status,
  rows,
}: {
  title: string;
  status: string;
  rows: TicketRow[];
}) => (
  <Box
    sx={{
      p: 2.5,
      height: "100%",
      border: "1px solid",
      borderColor: TOKENS.hairline,
      borderRadius: 2.5,
      bgcolor: TOKENS.surface,
      transition: "box-shadow 0.15s ease, border-color 0.15s ease",
      "&:hover": {
        borderColor: TOKENS.ink,
        boxShadow: "0 4px 14px rgba(28,27,41,0.08)",
      },
    }}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={1.5}
    >
      <Typography fontWeight={700} sx={{ color: TOKENS.ink }}>
        {title}
      </Typography>

      <StatusChip status={status} />
    </Box>

    <Divider sx={{ mb: 1.5, borderColor: TOKENS.hairline }} />

    <Stack spacing={0.9}>
      {rows.map((row) => (
        <Box
          key={row.label}
          display="flex"
          justifyContent="space-between"
          gap={2}
        >
          <Typography variant="body2" sx={{ color: TOKENS.inkMuted }}>
            {row.label}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: row.accent || TOKENS.ink }}
          >
            {row.value}
          </Typography>
        </Box>
      ))}
    </Stack>
  </Box>
);

// Compact card used inside the Pending / Delivered order lists —
// denser than a ticket, built for scanning many orders at a glance.
const OrderRow = ({
  order,
  type,
}: {
  order: ReportOrder;
  type: "pending" | "delivered";
}) => {
  const accent = type === "pending" ? TOKENS.amber : TOKENS.emerald;
  const accentSoft = type === "pending" ? TOKENS.amberSoft : TOKENS.emeraldSoft;

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: TOKENS.hairline,
        borderRadius: 2.5,
        bgcolor: TOKENS.surface,
        transition: "box-shadow 0.15s ease, border-color 0.15s ease",
        "&:hover": {
          borderColor: accent,
          boxShadow: "0 4px 14px rgba(28,27,41,0.06)",
        },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: accentSoft,
            color: accent,
            width: 36,
            height: 36,
            borderRadius: 1.5,
          }}
        >
          {type === "pending" ? (
            <Inventory2RoundedIcon sx={{ fontSize: 18 }} />
          ) : (
            <LocalShippingRoundedIcon sx={{ fontSize: 18 }} />
          )}
        </Avatar>

        <Box flex={1} minWidth={0}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Typography fontWeight={700} sx={{ color: TOKENS.ink }} noWrap>
              {order.orderNumber}
            </Typography>
            <Typography
              fontWeight={700}
              sx={{ color: TOKENS.ink, whiteSpace: "nowrap" }}
            >
              {formatCurrency(order.totalAmount)}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.75} alignItems="center" mt={0.5}>
            <StyleRoundedIcon sx={{ fontSize: 14, color: TOKENS.inkMuted }} />
            <Typography variant="body2" sx={{ color: TOKENS.inkMuted }} noWrap>
              {order.dressType}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            mt={0.75}
            flexWrap="wrap"
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PersonSearchRoundedIcon
                sx={{ fontSize: 14, color: TOKENS.inkMuted }}
              />
              <Typography variant="caption" sx={{ color: TOKENS.inkMuted }}>
                {order.customerId.name}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <PhoneRoundedIcon sx={{ fontSize: 14, color: TOKENS.inkMuted }} />
              <Typography variant="caption" sx={{ color: TOKENS.inkMuted }}>
                {order.customerId.phone}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <EventAvailableRoundedIcon
                sx={{ fontSize: 14, color: TOKENS.inkMuted }}
              />
              <Typography variant="caption" sx={{ color: TOKENS.inkMuted }}>
                {formatDate(order.deliveryDate)}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};