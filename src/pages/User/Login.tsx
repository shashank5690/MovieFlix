import  { useState } from 'react';
import Typography from "@mui/material/Typography";
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess, addToFavorites } from '../../redux/uersAuth/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { AppBar, TextField, Toolbar } from '@mui/material';
import CommonButton from '../../components/common/CommonButton';
import localforage from 'localforage';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../utils/schema/loginSignupSchema';
import { LoginFormData, UserData } from '../../utils/interface/types';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);

        setTimeout(async () => {
            try {
                const users: UserData[] = await localforage.getItem<UserData[]>('users') || [];
                const authenticated = users.find(u => u.email === data.email && u.password === data.password);

                if (authenticated) {
                    dispatch(loginSuccess(authenticated));
                    if (authenticated.favorites) {
                        authenticated.favorites.forEach((fav) => dispatch(addToFavorites(fav)));
                    }
                    localforage.setItem('currentUser', authenticated);
                    navigate("/");
                } else {
                    dispatch(loginFailure('Invalid Credentials'));
                    setError('Invalid Credentials');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1000); 
    };

    return (
        <>
          <AppBar
            position="static"
            sx={{
              background: 'white',
              color: '#03071e',
              borderRadius: '10px',
              mb: 4,
              boxShadow:'0',  // Adds margin at the bottom to separate the AppBar from the form
            }}
          >
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center' , fontFamily:"Playwrite DK Uloopet", fontWeight:'bold'}}>
                  Welcome Back! 👋
              </Typography>
            </Toolbar>
          </AppBar>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <Typography color="error" style={{ marginBottom: '10px' }}>
                {error}
              </Typography>
            )}
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              required
              placeholder="Enter your email"
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
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              required
              placeholder="Enter your password"
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
              }}
            />
            <CommonButton 
              type="submit" 
              loading={loading}
            >
              Login
            </CommonButton>

            
            <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    textAlign: 'center',
                    color: '#555',
                  }}
                >
                  Already have an account? 🎯{' '}
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
                    onClick={() => navigate('/signup')} // Navigate to the Sign Up page on click
                  >
                    Sign Up
                  </Typography>
                </Typography>
          </form>
        </>
    );
};

export default Login;
