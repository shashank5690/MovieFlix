import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { IoMdPerson } from "react-icons/io";
import localforage from "localforage";
import { logout } from "../../redux/uersAuth/authSlice";
import SearchBar from '../SearchBar';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        localforage.removeItem('currentUser');
        navigate('/login');
    };

    const handleFavorite = () => {
        navigate('/favorite');
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Toolbar>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                variant="h6"
                component="div"
                sx={{
                    flexGrow: 1,
                    display: 'inline-block',
                    fontFamily: 'Bebas Neue, Arial, sans-serif',
                    fontSize: '2rem',
                }}
                >
                <span style={{ fontWeight: 'bold', color: 'white' }}>MOVIE</span>
                <span style={{ fontStyle: 'italic', color: 'red' }}>flix</span>
                </Typography>
                </Link>

              
                <div style={{ flex: 1, textAlign: 'center'}}>
                    <SearchBar/>
                </div>
                <div>
                    {currentUser ? (
                        <>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="favorites"
                                onClick={handleFavorite}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="logout"
                                onClick={handleLogout}
                            >
                               <LogoutIcon />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="login"
                            onClick={() => navigate('/login')}
                        >
                            <IoMdPerson />
                        </IconButton>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
