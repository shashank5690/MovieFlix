import React from 'react';
import Button from "@mui/material/Button";
import Loader from './Loader';
import Box from '@mui/material/Box';

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
            mt:'6px',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': { backgroundColor: '#E50914' },
            height: 50,  // Adjusted height for a smaller button
            fontSize: '1rem',
            fontWeight:'bold',  // Adjusted font size for a smaller button
            width: '100%',  
            maxWidth: 250,  // Adjusted max width for a smaller button
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50px',
            border: '2px solid black',  // Added 2px black border
            mx: 'auto',  // Center the button horizontally
          }}
        >
  {children}
  {loading && <Loader />}
</Button>

    );
};

export default CommonButton;