import React from 'react';
import useApiData from '../../utils/customHooks/Apidata';
import MovieCard from './MoivesCard';debugger
import { Container, Grid } from '@mui/material';
import Loader from '../../components/common/Loader';
import { Movie } from '../../utils/interface/types';
import ErrorBoundary from '../../utils/errorboundary/ErrorBoundary'; 

const Movies: React.FC = () => {
    const { data, loading, error } = useApiData();


    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Data is not available.</p>;

    return (
        <ErrorBoundary fallback={<p>NOT found .</p>}>
            <Container>
                <Grid container spacing={3}>
                    {data.map((movie: Movie) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ErrorBoundary>
    );
};

export default Movies;
