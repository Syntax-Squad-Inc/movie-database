import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Button,
  Box,
  IconButton,
  InputBase,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import { searchMovies } from './utils/api';
import backgroundImage from '../image/OIP.jfif';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              Movies 
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {showSearch ? (
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <IconButton type="submit" sx={{ p: '10px' }}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              ) : (
                <Button
                  color="inherit"
                  startIcon={<SearchIcon />}
                  onClick={() => setShowSearch(true)}
                >
                  Search
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        
        <Box
          sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '6rem 0',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          <Container>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Welcome to the Cinema Experience! 
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ 
                color: '#e0e0e0',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              Discover your next favorite movie
            </Typography>
          </Container>
        </Box>

        <Container>
          {loading ? (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
              Loading...
            </Typography>
          ) : (
            <MovieList movies={movies} loading={loading} />
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
