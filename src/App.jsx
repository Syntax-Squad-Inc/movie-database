import { useState, useEffect } from 'react';
import { Container, Typography, CssBaseline, AppBar, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './components/MovieList';
import { searchMovies } from './utils/api';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
});

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const results = await searchMovies('popular'); 
        setMovies(results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie Database
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {loading ? (
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
            Loading...
          </Typography>
        ) : (
          <MovieList movies={movies} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
