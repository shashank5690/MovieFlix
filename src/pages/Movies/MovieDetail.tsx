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

interface MovieDetailProps {}

const MovieDetail: React.FC<MovieDetailProps> = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const { data, loading, error } = useApiData();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser) as UserData | null | undefined;
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<{ user: string; comment: string }[]>([]);
    const [userRating, setUserRating] = useState<number | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const storedComments = await localforage.getItem<{ user: string; comment: string }[]>(`comments_${imdbID}`);
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
        if (newComment.trim() !== '') {
            const comment = { user: currentUser?.name ?? 'Anonymous', comment: newComment };
            dispatch(addComment(comment));
            const updatedComments = [...comments, comment];
            setComments(updatedComments);
            await localforage.setItem(`comments_${imdbID}`, updatedComments);
            setNewComment('');
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
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CardMedia
                            component="img"
                            image={movie.Poster}
                            alt={movie.Title}
                            sx={{
                                width: { xs: '100%', sm: '80%', md: '570px' },
                                height: { xs: 'auto', sm: 'auto', md: '720px' },
                                objectFit: 'cover',
                                borderRadius: '10px',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-10px)',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent sx={{ fontFamily: 'Inter' }}>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{ fontWeight: 'bold', fontFamily: 'Inter', fontSize: '32px' }}
                            >
                                {movie.Title}
                            </Typography>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                {movie.Plot}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Rating:</span> {movie.imdbRating}/10
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Released:</span> {movie.Released}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Director:</span> {movie.Director}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Writer:</span> {movie.Writer}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Actors:</span> {movie.Actors}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Language:</span> {movie.Language}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Genre:</span> {movie.Genre}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Country:</span> {movie.Country}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontFamily: 'Inter' }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Awards:</span> {movie.Awards}
                            </Typography>
                            <Button
                                onClick={toggleFavorite}
                                sx={{ color: 'red', marginBottom: '22px' }}
                                disabled={!currentUser}
                            >
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </Button>
                            <Rating
                                name="user-rating"
                                value={userRating}
                                onChange={handleRatingChange}
                                sx={{ marginBottom: '16px' }}
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
                                    borderRadius: '4px',
                                    resize: 'vertical',
                                }}
                                disabled={!currentUser}
                            />
                            <Button
                                onClick={handleAddComment}
                                sx={{
                                    marginTop: '8px',
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
                                        sx={{ borderBottom: '1px solid #ddd', paddingTop: '8px', paddingBottom: '8px' }}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                                            primary={`${comment.user}: ${comment.comment}`}
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
