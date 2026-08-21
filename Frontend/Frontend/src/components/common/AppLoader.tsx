import { Box, CircularProgress, Typography } from "@mui/material";

interface AppLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

const AppLoader = ({
  message = "Loading...",
  fullScreen = false,
}: AppLoaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        minHeight: fullScreen ? "100vh" : 250,
      }}
    >
      <CircularProgress />

      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default AppLoader;