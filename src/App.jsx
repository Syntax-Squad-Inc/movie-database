import { useState, useCallback, useEffect } from 'react';
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
  Paper,
  ButtonGroup,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import { searchMovies } from './utils/api';
import './App.css';

// Array of background images - using high-quality movie-themed backgrounds
const backgroundImages = [
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80',  // Movie Theater
  'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',  // Colorful Cinema Lights
  'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2056&q=80',  // Colorful Theater Interior
];

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

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

function App() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const handleSearch = useCallback(
    debounce(async () => {
      if (!searchQuery.trim()) return;
      setError('');
      try {
        const results = await searchMovies(searchQuery);
        setFilter('search');
        setMovies(results);
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Failed to search movies. Please try again later.');
      }
    }, 500),
    [searchQuery]
  );

  // Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImages[currentBackgroundIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 1s ease-in-out',
        position: 'relative',
      }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: { xs: 'center', sm: 'space-between' }, flexWrap: 'wrap' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movies 
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              {showSearch ? (
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: '90%', sm: 400 } }}
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
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Search
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        
        <Box
          sx={{
            padding: { xs: '3rem 0', sm: '6rem 0' },
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
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }
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
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' }
              }}
            >
              Discover your next favorite movie
            </Typography>
          </Container>
        </Box>

        <Container>
          <ButtonGroup sx={{ mt: 4, flexWrap: 'wrap' }} variant="outlined" aria-label="outlined button group">
            <Button onClick={() => setFilter('all')} sx={{ flex: { xs: '1 0 100%', sm: 'auto' } }}>All</Button>
            <Button onClick={() => setFilter('popular')} sx={{ flex: { xs: '1 0 100%', sm: 'auto' } }}>Popular</Button>
            <Button onClick={() => setFilter('latest')} sx={{ flex: { xs: '1 0 100%', sm: 'auto' } }}>Latest</Button>
          </ButtonGroup>

          <MovieList filter={filter} />
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
