// FavoritesPage.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Movie } from '../../utils/interface/types';
import { removeFromFavorites } from '../../redux/uersAuth/authSlice';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const handleRemoveFromFavorites = (movie: Movie) => {
        dispatch(removeFromFavorites(movie));
    };

    return (
        <div className="favorites-container" style={{ padding: '16px' }}>
  <Typography variant="h4" className="page-title" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
    Your Favorites
  </Typography>
  {currentUser?.favorites.length === 0 ? (
    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Roboto' }}>
      No favorite movies added yet.
    </Typography>
  ) : (
    <Grid container spacing={3}>
      {currentUser?.favorites.map((favorite) => (
        <Grid item key={favorite.imdbID} xs={12} sm={6} md={4} lg={3}>
          <Card
            className="favorite-card"
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-10px)',
              },
            }}
          >
            <CardMedia
              component="img"
              className="card-media"
              image={favorite.Poster}
              alt={favorite.Title}
              sx={{
                height: 400,
                borderRadius: '10px 10px 0 0',
                objectFit: 'cover',
              }}
            />
            <CardContent
              className="card-content"
              sx={{ fontFamily: 'Roboto', paddingBottom: 2 }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 'bold', fontFamily: 'Roboto' }}
              >
                {favorite.Title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: 'Roboto', marginBottom: 1 }}
              >
                {favorite.Plot}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: 'Roboto', marginBottom: 0.5 }}
              >
               <span><strong>Rating: </strong></span> {favorite.imdbRating}/10
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: 'Roboto', marginBottom: 0.5 }}
              >
                <span><strong>Released: </strong></span>  {favorite.Released}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: 'Roboto', marginBottom: 0.5 }}
              >
               <span><strong> Director:  </strong></span>{favorite.Director}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: 'Roboto', marginBottom: 0.5 }}
              >
               <span><strong> Genre:  </strong></span>{favorite.Genre}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: 'Roboto', marginBottom: 0.5 }}
              >
               <span><strong> Country:  </strong></span>{favorite.Country}
              </Typography>
            </CardContent>
            <div className="card-actions" style={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
              <IconButton
                aria-label="remove"
                onClick={() => handleRemoveFromFavorites(favorite)}
                sx={{ color: 'red' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  )}
</div>

    );
};

export default FavoritesPage;
