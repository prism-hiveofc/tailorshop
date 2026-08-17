import { Paper, Stack, Avatar, Typography } from "@mui/material";
import type { ReactNode } from "react";

const TOKENS = {
  ink: "#1C1B29",
  inkMuted: "#5B5A6B",
  hairline: "#E7E5EE",
  radius: 3,
};

type StatCardProps = {
  title: string;
  value: number | string;
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
};

const StatCard = ({
  title,
  value,
  icon,
  iconBg = "#EFEFF2",
  iconColor = TOKENS.inkMuted,
}: StatCardProps) => {
  return (
    <Paper
      sx={{
        p: 2.5,
        height: "100%",
        borderRadius: TOKENS.radius,
        border: "1px solid",
        borderColor: TOKENS.hairline,
        boxShadow: "0 1px 2px rgba(28,27,41,0.04)",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease",
        "&:hover": {
          borderColor: iconColor,
          boxShadow: "0 4px 14px rgba(28,27,41,0.06)",
        },
      }}
    >
      <Stack direction="row" spacing={1.75} alignItems="flex-start">
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: iconBg,
            color: iconColor,
            width: 42,
            height: 42,
            borderRadius: 2,
          }}
        >
          {icon}
        </Avatar>

        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              color: TOKENS.inkMuted,
              fontWeight: 700,
              letterSpacing: 0.4,
              textTransform: "uppercase",
              fontSize: 11,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            fontWeight={800}
            noWrap
            sx={{ color: TOKENS.ink, letterSpacing: -0.3 }}
          >
            {value}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default StatCard;