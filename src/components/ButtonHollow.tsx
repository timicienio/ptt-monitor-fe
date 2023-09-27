import Button from "@mui/material/Button";
import React from "react";

type CustomButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const ButtonHollow: React.FC<CustomButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      sx={{
        color: 'info.light',  
        borderColor: 'info.main',
        backgroundColor: 'info.main',
        '&:hover': {
            color: 'info.light',  
            borderColor: 'info.dark',
            backgroundColor: 'info.dark',
        },
        '&:active': {
            backgroundColor: 'info.dark', 
        },
        '&:disabled': {
            color: 'grey.500',
            borderColor: 'grey.300',
            backgroundColor: 'grey.300',
        }
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonHollow;
