import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  type TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordInputProps = TextFieldProps;

const PasswordInput = ({
  InputProps,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;