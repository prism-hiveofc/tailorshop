import Button, {
  type ButtonProps,
} from "@mui/material/Button";

const SubmitButton = (props: ButtonProps) => {
  return (
    <Button
      fullWidth
      size="large"
      variant="contained"
      {...props}
    />
  );
};

export default SubmitButton;