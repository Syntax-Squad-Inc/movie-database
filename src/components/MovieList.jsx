import PropTypes from 'prop-types';
import { Grid, Container, Typography } from '@mui/material';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
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
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
