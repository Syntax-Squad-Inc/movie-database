// MovieDetails.jsx
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Typography, Box, Button, Grid, Chip, LinearProgress, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { getMovieDetails } from '../utils/api';

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(movieId);
      setMovie(data);
      setLoading(false);
      console.log(data)
    };

    fetchMovieDetails();
  }, [movieId]);


  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!movie) {
    return <Typography>Error loading movie details.</Typography>;
  }

  const trailer = movie.videos.results.find(video => video.type === 'Trailer');
  const userScore = movie.vote_average * 10;
  const director = movie.credits.crew.find(member => member.job === 'Director');
  const writers = movie.credits.crew.filter(member => member.job === 'Writer');
  const topCast = movie.credits.cast.slice(0, 10);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">{movie.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary">{movie.release_date}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <LinearProgress variant="determinate" value={userScore} sx={{ width: '100%', mr: 1 }} />
        <Typography variant="body2" color="text.secondary">{userScore.toFixed(0)}%</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {movie.genres.map(genre => (
          <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Runtime: {movie.runtime} minutes
      </Typography>
      <Box sx={{ mt: 2 }}>
        {trailer && (
          <Box>
            <Typography variant="h6">Trailer</Typography>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Overview</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>{movie.overview}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Top Billed Cast</Typography>
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <List>
              {topCast.map(actor => (
                <ListItem key={actor.id}>
                  <ListItemAvatar>
                    <Avatar src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                  </ListItemAvatar>
                  <ListItemText primary={actor.name} secondary={actor.character} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Creators</Typography>
          <Typography variant="body1">{director?.name} (Director)</Typography>
          <List>
            {writers.map(writer => (
              <ListItem key={writer.id}>
                <ListItemText primary={`${writer.name} (Writer)`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );
};

MovieDetails.propTypes = {
  movieId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieDetails;
