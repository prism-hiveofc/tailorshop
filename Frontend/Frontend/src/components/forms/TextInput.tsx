import TextField, {
  type TextFieldProps,
} from "@mui/material/TextField";

type TextInputProps = TextFieldProps;

const TextInput = (props: TextInputProps) => {
  return (
    <TextField
      fullWidth
      {...props}
    />
  );
};

export default TextInput;