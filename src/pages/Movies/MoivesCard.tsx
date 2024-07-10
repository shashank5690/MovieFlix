import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Movie } from '../../utils/interface/types';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { removeFromFavorites, addToFavorites } from '../../redux/uersAuth/authSlice';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        navigate(`/movie/${movie.imdbID}`);
    };

    return (
        <Grid item xs={12}>
            <Card
                className="movie-card"
                style={{
                    height: '100%',
                    marginTop: 16,
                    backgroundColor: 'white',
                    transition: 'transform 0.2s',
                    borderRadius: 6,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
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
                        borderRadius: '6px 6px 0 0',
                    }}
                />
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: 'bold', fontFamily: 'League Spartan', fontSize: '25px' }}
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
                        sx={{ fontWeight: 'bold', color: '#9d0208', fontFamily: 'League Spartan', fontSize: '12px', marginTop:'-8px', marginLeft:'-5px' }}
                    >
                        {isExpanded ? 'See Less' : 'See More'}
                    </Button>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '1rem', fontFamily: 'League Spartan' }}
                    >
                        <span style={{ fontWeight: 'bold' }}>Director:</span> {movie.Director}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '1rem', fontFamily: 'League Spartan' }}
                    >
                        <span style={{ fontWeight: 'bold' }}>Rating:</span> {movie.imdbRating}/10
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '1rem', fontFamily: 'League Spartan' }}
                    >
                        <span style={{ fontWeight: 'bold' }}>Released:</span> {movie.Released}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '1rem', fontFamily: 'League Spartan' }}
                    >
                        <span style={{ fontWeight: 'bold' }}>Genre:</span> {movie.Genre.substring(0, 18)}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button
                        onClick={toggleFavorite}
                        disabled={!currentUser}
                        sx={{
                            color: 'red',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': {
                                color: 'black',
                            },
                        }}
                    >
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default MovieCard;
