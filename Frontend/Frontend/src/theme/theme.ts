import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";

export const theme = createTheme({
  palette,

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "'Roboto', sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 48,
          borderRadius: 10,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "medium",
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "sm",
      },
    },
  },
});