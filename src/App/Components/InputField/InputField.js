import { InputAdornment, TextField } from "@mui/material";
import { Colors } from "../../Assets/Styles/Colors";

function InputField(props) {
  const {
    fullWidth,
    variant,
    placeholder,
    size,
    type,
    register,
    error,
    helperText,
    inputProps,
    inputMode,
    icon,
    readOnly,
    multiline,
    rows,
    code,
    onChange,
    value
  } = props;
  return (
    <TextField
       onChange={onChange}
      value={value}
      fullWidth={fullWidth}
      variant={variant}
      placeholder={placeholder}
      type={type}
      size={size}
      multiline={multiline}
      rows={rows}
      inputProps={inputProps}
      inputMode={inputMode}
      {...register}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">
            {icon && icon}
            {<span>{code}</span>}
          </InputAdornment>
        ) : (
          ""
        ),
        readOnly: readOnly,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: Colors.secondary,
          },
          "&.Mui-focused fieldset": {
            borderColor: Colors.secondary,
          },
        },
        "& .MuiInputLabel-root": {
          color: "inherit",
          "&.Mui-focused": {
            color: Colors.secondary,
          },
        },
      }}
    />
  );
}

export default InputField;
