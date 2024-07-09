// MovieTypography.tsx
import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface MovieTypographyProps extends TypographyProps {
    variant: 'h4' | 'h5' | 'h6' | 'body1' | 'body2'; 
    gutterBottom?: boolean;
    text: string;
}

const MovieTypography: React.FC<MovieTypographyProps> = ({ variant, gutterBottom = false, text }) => {
    return (
        <Typography variant={variant} gutterBottom={gutterBottom}
        sx={{
            '& .MuiInputLabel-root': { color: '#333' },
            '& .MuiInputBase-input': { color: '#333' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ddd' },
              '&:hover fieldset': { borderColor: '#888' },
              '&.Mui-focused fieldset': { borderColor: '#888' },
              borderRadius: 2,
            },
            bgcolor: '#f5f5f5',
          }}>
            {text}
        </Typography>
    );
};

export default MovieTypography;
