import { useState } from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/common/CommonFormField';
import CommonButton from '../../components/common/CommonButton';
import useRegisterForm from '../../utils/customHooks/useRegisterForm';
import { UserData } from '../../utils/interface/types';
import localforage from 'localforage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: UserData) => {
        setLoading(true);

        setTimeout(async () => {
            try {
                const existingUsers: UserData[] = (await localforage.getItem<UserData[]>('users')) || [];

                
                const userId = existingUsers.length + 1;

                const newUser: UserData = {
                    ...data, 
                    id: userId.toString(), 
                    favorites: [],
                    comments: [],
                };
                existingUsers.push(newUser);
                await localforage.setItem('users', existingUsers);
                navigate('/login');
            } catch (error) {
                console.error('Error registering user:', error);
                setError('Registration failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1000); 
    };

    const { handleSubmit: handleFormSubmit, control, errors } = useRegisterForm({ onSubmit, error, loading });

    return (
        <>
             <AppBar
                position="static"
                sx={{
                background: 'white',
                color: '#03071e',
                borderRadius: '10px',
                mb: 4,
                boxShadow:'0'  // Adds margin at the bottom to separate the AppBar from the form
                }}
            >
                <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1, 
                    textAlign: 'center' , 
                    fontFamily:"Playwrite DK Uloopet", 
                    fontWeight:'bold'}}>
                    Let's Register You! 🚀
                </Typography>
                </Toolbar>
            </AppBar>
                
            <form onSubmit={handleFormSubmit}>
                {error && <Typography color="error">{error}</Typography>}
                <FormField
                name="name"
                control={control}
                label="Name *"
                error={!!errors.name}
                helperText={errors.name?.message}
      />
                <FormField
                    name="email"
                    control={control}
                    label="Email *"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <FormField
                    name="password"
                    control={control}
                    label="Password *"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <CommonButton type="submit" 
                   loading={loading}>
                    SignUp!
                </CommonButton>

                <Typography
                    variant="body2"
                    sx={{
                        mt: 2,
                        textAlign: 'center',
                        color: '#555',
                    }}
                        >
                        Don’t have an account? 🤝{' '}
                        <Typography
                            component="span"
                            sx={{
                            color: '#d00000',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                            }}
                            onClick={() => navigate('/login')} // Navigate to the Sign Up page on click
                        >
            Login now!
          </Typography>
        </Typography>
            </form>
        </>
    );
};

export default Register;
