import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Box, Button, Dialog } from '@mui/material';
import MovieDetails from './MovieDetails';

const MovieCard = ({ movie }) => {
  const [open, setOpen] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.it/500x750?text=No+Image+Available';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', border: 'ButtonHighlight' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
      </CardContent>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {movie.release_date?.split('-')[0]}
          </Typography>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
          />
        </Box>
        <Button variant="contained" onClick={handleOpen}>
          View Details
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <MovieDetails movieId={movie.id} onClose={handleClose} />
      </Dialog>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    id: PropTypes.number.isRequired
  }).isRequired
};

export default MovieCard;
