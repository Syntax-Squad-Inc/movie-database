import { useState } from 'react';
import { Container, Typography, Grid, Button, ButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  const [filter, setFilter] = useState('all');

  const filterMovies = (movies, filter) => {
    switch (filter) {
      case 'popular':
        return [...movies].filter(a => a.popularity >= 2);
      case 'latest':
        return [...movies].filter(a => new Date(a.release_date).getFullYear() >= 2015);
      default:
        return movies;
    }
  };

  const filteredMovies = filterMovies(movies, filter);

  if (!filteredMovies.length) {
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
      <ButtonGroup sx={{ mt: 4 }} variant="outlined" aria-label="outlined button group">
        <Button onClick={() => setFilter('all')}>All</Button>
        <Button onClick={() => setFilter('popular')}>Popular</Button>
        <Button onClick={() => setFilter('latest')}>Latest</Button>
      </ButtonGroup>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
