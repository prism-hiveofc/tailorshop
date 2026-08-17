import Snackbar from "@mui/material/Snackbar";
import { Box, Stack, Typography, IconButton } from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

// =========================
// DESIGN TOKENS
// Same editorial palette used across the whole app —
// charcoal ink + muted brass accent — kept consistent here.
// =========================
const TOKENS = {
  ink: "#1C1B29",
  inkMuted: "#5B5A6B",
  surface: "#FFFFFF",
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

const SEVERITY_META = {
  success: {
    color: TOKENS.emerald,
    bg: TOKENS.emeraldSoft,
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 20 }} />,
  },
  error: {
    color: TOKENS.ruby,
    bg: TOKENS.rubySoft,
    icon: <ErrorRoundedIcon sx={{ fontSize: 20 }} />,
  },
  warning: {
    color: TOKENS.amber,
    bg: TOKENS.amberSoft,
    icon: <WarningAmberRoundedIcon sx={{ fontSize: 20 }} />,
  },
  info: {
    color: TOKENS.sapphire,
    bg: TOKENS.sapphireSoft,
    icon: <InfoRoundedIcon sx={{ fontSize: 20 }} />,
  },
};

const AppSnackbar = ({
  open,
  message,
  severity,
  onClose,
}: AppSnackbarProps) => {
  const meta = SEVERITY_META[severity];

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box
        sx={{
          minWidth: 320,
          maxWidth: 420,
          bgcolor: TOKENS.surface,
          borderRadius: TOKENS.radius,
          border: "1px solid",
          borderColor: meta.bg,
          boxShadow:
            "0 8px 24px rgba(28,27,41,0.12), 0 2px 6px rgba(28,27,41,0.06)",
          overflow: "hidden",
        }}
      >
        <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ p: 1.75 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              flexShrink: 0,
              borderRadius: 1.5,
              bgcolor: meta.bg,
              color: meta.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {meta.icon}
          </Box>

          <Typography
            variant="body2"
            sx={{
              flex: 1,
              color: TOKENS.ink,
              fontWeight: 600,
              pt: "6px",
              wordBreak: "break-word",
            }}
          >
            {message}
          </Typography>

          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: TOKENS.inkMuted,
              mt: 0.25,
              "&:hover": { bgcolor: "rgba(28,27,41,0.05)" },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>

        <Box sx={{ height: 3, bgcolor: meta.bg }}>
          <Box
            sx={{
              height: "100%",
              bgcolor: meta.color,
              animation: "appSnackbarShrink 3000ms linear forwards",
              "@keyframes appSnackbarShrink": {
                from: { width: "100%" },
                to: { width: "0%" },
              },
            }}
          />
        </Box>
      </Box>
    </Snackbar>
  );
};

export default AppSnackbar;