import Button from "@mui/material/Button";
import React from "react";

type CustomButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const ButtonSolid: React.FC<CustomButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      sx={{
        color: 'info.main',  
        borderColor: 'info.main',
        backgroundColor: 'secondary.contrastText',
        '&:hover': {
            color: 'info.main',  
            borderColor: 'info.main',
            backgroundColor: 'info.light',
        },
        '&:active': {
            backgroundColor: 'info.light', 
        },
        '&:disabled': {
            color: 'grey.500',
            borderColor: 'grey.500',
            backgroundColor: 'primary.light',
        }
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonSolid;
