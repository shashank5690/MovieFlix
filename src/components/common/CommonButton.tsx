import React from 'react';
import Button from "@mui/material/Button";
import Loader from './Loader';

interface CustomButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: string
}

const CommonButton: React.FC<CustomButtonProps> = ({ type = "button", disabled = false, loading = false, onClick, children }) => {
    return (
        <Button
  type={type}
  variant="contained"
  disabled={disabled || loading}
  size="large"
  onClick={onClick}
  sx={{
    mt: 10,
    backgroundColor: 'black',
    color: 'white',
    '&:hover': { backgroundColor: '#E50914' },
    height: 60,  // Increased height
    fontSize: '1.5rem',  // Larger font size
    width: '100%',  // Full width
    maxWidth: 300,  // Max width to prevent it from being too wide
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',  // Center the button
    borderRadius:'50px',
    marginLeft:'30px',
  }}
>
  {children}
  {loading && <Loader />}
</Button>
    );
};

export default CommonButton;