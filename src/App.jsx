import { useState } from 'react';
import { Container, Typography, CssBaseline, AppBar, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { searchMovies } from './utils/api';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <SearchBar onSearch={handleSearch} />
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
