import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useParams } from 'react-router-dom';
import useApiData from '../../utils/customHooks/Apidata';
import Loader from '../../components/common/Loader';
import { Movie, UserData } from '../../utils/interface/types';
import { addToFavorites, removeFromFavorites, addComment } from '../../redux/uersAuth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import localforage from 'localforage';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

interface MovieDetailProps {}

interface Comment {
    user: string;
    comment: string;
    rating: number | null;
}

const MovieDetail: React.FC<MovieDetailProps> = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const { data, loading, error } = useApiData();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser) as UserData | null | undefined;
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [userRating, setUserRating] = useState<number | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const storedComments = await localforage.getItem<Comment[]>(`comments_${imdbID}`);
                if (storedComments) {
                    setComments(storedComments);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [imdbID]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Typography variant="h6">Error fetching data: {error}</Typography>;
    }

    if (!data) {
        return <Typography variant="h6">No data available</Typography>;
    }

    // Find the movie details based on imdbID
    const movie = data.find((movie: Movie) => movie.imdbID === imdbID);

    if (!movie) {
        return <Typography variant="h6">Movie not found!</Typography>;
    }

    const isFavorite = currentUser?.favorites?.some(favorite => favorite.imdbID === movie.imdbID);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = async () => {
        if (newComment.trim() !== '' && userRating !== null) {
            const comment: Comment = {
                user: currentUser?.name ?? 'MR. X',
                comment: newComment,
                rating: userRating,
            };
            dispatch(addComment(comment));
            const updatedComments = [...comments, comment];
            setComments(updatedComments);
            await localforage.setItem(`comments_${imdbID}`, updatedComments);
            setNewComment('');
            setUserRating(null);
        }
    };

    const handleRatingChange = (_event: React.ChangeEvent<{}>, newValue: number | null) => {
        setUserRating(newValue);
    };

    return (
        <>
            <Card
                sx={{
                    maxWidth: '100%',
                    margin: 'auto',
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} >
                    <CardMedia
                        component="img"
                        image={movie.Poster}
                        alt={movie.Title}
                        sx={{
                            width: { xs: '100%', sm: '80%', md: '400px' },  // Make the image a bit smaller on desktop
                            height: { xs: 'auto', sm: 'auto', md: '600px' },  // Make the image a bit smaller on desktop
                            objectFit: 'cover',
                            borderRadius:'6px',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                            },
                            // Move the image up on desktop
                            mt: { xs: 0, sm: 0, md: 0 },  // Negative margin to move it up
                            mx: { xs: 0, sm: 0, md: 'auto' },  // Center the image horizontally on desktop
                        }}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent sx={{ fontFamily: 'League Spartan' }}>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{ fontWeight: 'bold', fontFamily: 'League Spartan', fontSize: '32px' }}
                            >
                                {movie.Title}
                            </Typography>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                {movie.Plot}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Rating:</span> {movie.imdbRating}/10
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Released:</span> {movie.Released}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Director:</span> {movie.Director}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Writer:</span> {movie.Writer}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Actors:</span> {movie.Actors}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Language:</span> {movie.Language}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Genre:</span> {movie.Genre}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Country:</span> {movie.Country}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'League Spartan' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Awards:</span> {movie.Awards}
                            </Typography>
                            <Button
                                onClick={toggleFavorite}
                                sx={{ color: 'red', marginBottom: '10px' }}
                                disabled={!currentUser}
                            >
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </Button>
                            <Rating
                                name="user-rating"
                                value={userRating}
                                onChange={handleRatingChange}
                                sx={{ marginBottom: '16px',
                                    marginLeft:'10px',
                                 }}
                                disabled={!currentUser}
                            />
                            <TextareaAutosize
                                aria-label="Add comment.."
                                placeholder="Add comment.."
                                value={newComment}
                                onChange={handleCommentChange}
                                style={{
                                    marginTop: '16px',
                                    width: '75%',
                                    padding: '8px',
                                    border: '1px solid red',
                                    borderRadius: '40px',
                                    resize: 'vertical',
                                }}
                                disabled={!currentUser}
                            />
                            <Button
                                onClick={handleAddComment}
                                sx={{
                                    
                                    color: 'red',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        color: 'black',
                                    },
                                    
                                }}
                                disabled={!currentUser}
                            >
                                Add Comment
                            </Button>
                            <Typography variant="h6" sx={{ marginTop: '24px', fontWeight: 'bold' }}>
                                Comments:
                            </Typography>
                            <List>
                                {comments.map((comment, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            border: '1px solid #ddd',
                                            borderRadius: '12px',
                                            marginBottom: '8px',
                                            
                                        }}
                                    >
                                       <ListItemText
                                        primary={comment.user}
                                        secondary={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'-2px'}}>
                                                <Typography component="span" variant="body2" color="textPrimary">
                                                    {comment.comment}
                                                </Typography>
                                                <Rating value={comment.rating} readOnly />
                                            </Box>
                                        }
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontWeight: 'bold',
                                            },
                                        }}
                                    />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default MovieDetail;
