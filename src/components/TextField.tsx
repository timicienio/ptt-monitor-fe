import { TextField, TextFieldProps, InputAdornment } from "@mui/material";
import Search from '@mui/icons-material/Search';
import React from "react";

type CustomAutocompleteTextFieldProps = TextFieldProps & {
  params?: any;
};

const CustomTextField: React.FC<CustomAutocompleteTextFieldProps> = ({ params, ...props }) => {
  return (
    <TextField
      size="medium"
      {...params}
      {...props}
      sx={{
        '& .MuiInputBase-root': {
          height: '45px',
          display: 'flex',
          alignItems: 'center', 
          borderRadius: '15px',
          borderColor: 'primary.dark',
          backgroundColor: 'secondary.contrastText'
        },
        '& .MuiInputBase-input': {
          padding: '6px 12px',
          appearance: 'none', 
          '&::-ms-expand': {
            display: 'none'
          }
        },
        '& .MuiInputLabel-root': {
          transform: 'translate(14px, 12px) scale(1)',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
          }
        }
      }}
    />
  );
}

export default CustomTextField;
