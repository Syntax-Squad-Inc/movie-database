import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Grid } from '@mui/material';
import MovieCard from './MovieCard';
import { fetchTrendingMovies, fetchPopularMovies, fetchLatestMovies } from '../utils/api';

const MovieList = ({ filter, searchResults, loading }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (filter === 'search') {
      setMovies(searchResults);
    } else {
      const fetchMovies = async () => {
        try {
          let results;
          if (filter === 'popular') {
            results = await fetchPopularMovies();
          } else if (filter === 'latest') {
            results = await fetchLatestMovies();
          } else {
            results = await fetchTrendingMovies();
          }
          setMovies(results);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };

      fetchMovies();
    }
  }, [filter, searchResults]);

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        Loading...
      </Typography>
    );
  }

  if (!movies.length) {
    return (
      <Container>
        <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>
          No movies found. Try searching for something else!
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

MovieList.propTypes = {
  filter: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MovieList;
