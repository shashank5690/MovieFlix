// MovieCard.tsx
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Movie } from '../../utils/interface/types';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { removeFromFavorites, addToFavorites } from '../../redux/uersAuth/authSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';


interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const [isExpanded, setIsExpanded] = useState(false);

    const isFavorite = useMemo(() => {
        return currentUser?.favorites?.some(favorite => favorite.imdbID === movie.imdbID);
    }, [currentUser?.favorites, movie.imdbID]);
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    const navigateToMovieDetails = () => {
        history(`/movie/${movie.imdbID}`);
    };

    return (
        <>
    <Grid item xs={12}>
        <Card
            className="movie-card"
            style={{
                height: '100%',
                marginTop: 16, // Increase margin for better spacing
                backgroundColor: 'white',
                transition: 'transform 0.2s',
                borderRadius: 10, // Card border radius
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            }}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <CardMedia
            component="img"
                height="400"
                image={movie.Poster}
                alt={movie.Title}
                onClick={navigateToMovieDetails}
                style={{
                    cursor: 'pointer',
                    borderRadius: '10px 10px 0 0', 
            }}
            />
            <CardContent>
            <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: '25px' }}
            >
                {movie.Title}
            </Typography>
            {isExpanded && (
                <Typography variant="body2" sx={{ fontFamily: 'Roboto' }}>
                {movie.Plot}
                </Typography>
            )}
            <Button
                size="small"
                onClick={toggleExpand}
                sx={{ fontWeight: 'bold', color: 'red', fontFamily: 'Inter', fontSize: '15px' }}
            >
                {isExpanded ? 'See Less' : 'See More'}
            </Button>
            <Typography
                variant="body2"
                sx={{ fontSize: '1rem', fontFamily: 'Inter' }}
            >
                <span style={{ fontWeight: 'bold' }}>Director:</span> {movie.Director}
            </Typography>
            <Typography
                variant="body2"
                sx={{ fontSize: '1rem', fontFamily: 'Inter' }}
            >
                <span style={{ fontWeight: 'bold' }}>Rating:</span> {movie.imdbRating}/10
            </Typography>
            <Typography
                variant="body2"
                sx={{ fontSize: '1rem', fontFamily: 'Inter' }}
            >
                <span style={{ fontWeight: 'bold' }}>Released:</span> {movie.Released}
            </Typography>
            <Typography
                variant="body2"
                sx={{ fontSize: '1rem', fontFamily: 'Inter' }}
            >
                <span style={{ fontWeight: 'bold' }}>Genre:</span> {movie.Genre}
            </Typography>
            </CardContent>
            <CardActions>
            <Button onClick={toggleFavorite}>
                {isFavorite ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: 'red' }} />}
            </Button>
            </CardActions>
         </Card>
        </Grid>
        </>
    );
};

export default MovieCard;
