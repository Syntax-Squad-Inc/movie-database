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
];

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d32f2f', // Red primary color
      light: '#ff6659',
      dark: '#9a0007',
    },
    secondary: {
      main: '#ff1744', // Accent red
      light: '#ff616f',
      dark: '#c4001d',
    },
    background: {
      default: '#1a0000', // Very dark red background
      paper: '#2d0808', // Dark red paper
    },
    error: {
      main: '#ff1744',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ff8a80',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#d32f2f', // Red AppBar
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#ff4444',
          },
        },
      },
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
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const results = await searchMovies(searchQuery);
      if (results.length === 0) {
        setError('No movies found. Try a different search term.');
      } else {
        setSearchResults(results);
        setFilter('search');
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Failed to search movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#1a0000',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
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
                  sx={{ 
                    p: '2px 4px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: { xs: '90%', sm: 400 },
                    backgroundColor: '#2d0808',
                    '&:hover': {
                      backgroundColor: '#3d0808',
                    }
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <InputBase
                    sx={{ 
                      ml: 1, 
                      flex: 1,
                      color: '#ff8a80',
                      '& .MuiInputBase-input::placeholder': {
                        color: '#ff8a80',
                        opacity: 0.7
                      }
                    }}
                    placeholder="Search Movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearch();
                      }
                    }}
                  />
                  <IconButton 
                    onClick={handleSearch}
                    sx={{ 
                      p: '10px',
                      color: '#ff8a80',
                      '&:hover': {
                        color: '#ff4444'
                      }
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              ) : (
                <Button
                  color="inherit"
                  startIcon={<SearchIcon />}
                  onClick={() => setShowSearch(true)}
                  sx={{ 
                    display: { xs: 'none', sm: 'block' },
                    color: '#ff8a80',
                    '&:hover': {
                      color: '#ff4444'
                    }
                  }}
                >
                  Search
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        
        <Box
          sx={{
            height: { xs: '60vh', sm: '70vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: '3rem 0', sm: '6rem 0' },
            textAlign: 'center',
            marginBottom: '2rem',
            position: 'relative',
            backgroundImage: `url(${backgroundImages[currentBackgroundIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 1s ease-in-out',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(26, 0, 0, 0.7)', // Dark red overlay
              zIndex: 1
            }
          }}
        >
          <Container sx={{ position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                color: '#fff',
                textShadow: '2px 2px 4px rgba(211, 47, 47, 0.5)', // Red shadow
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
              }}
            >
              Welcome to the Cinema Experience! 
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ 
                color: '#ff8a80', // Light red text
                textShadow: '1px 1px 2px rgba(211, 47, 47, 0.5)', // Red shadow
                fontSize: { xs: '1.2rem', sm: '1.7rem', md: '2.2rem' },
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              Discover your next favorite movie
            </Typography>
          </Container>
        </Box>

        <Container sx={{ 
          backgroundColor: '#1a0000', 
          position: 'relative', 
          zIndex: 2,
          flex: '1 0 auto',
          mb: 4
        }}>
          {error && (
            <Typography 
              color="error" 
              sx={{ 
                textAlign: 'center', 
                mt: 2,
                color: '#ff8a80'
              }}
            >
              {error}
            </Typography>
          )}
          <ButtonGroup 
            sx={{ 
              mt: 4, 
              flexWrap: 'wrap',
              '& .MuiButton-root': {
                borderColor: '#d32f2f',
                color: '#ff8a80',
                '&:hover': {
                  borderColor: '#ff4444',
                  backgroundColor: 'rgba(211, 47, 47, 0.1)'
                }
              }
            }} 
            variant="outlined" 
            aria-label="outlined button group"
          >
            <Button onClick={() => setFilter('all')} sx={{ flex: { xs: '1 0 100%', sm: 'auto' } }}>All</Button>
            <Button onClick={() => setFilter('popular')} sx={{ flex: { xs: '1 0 100%', sm: 'auto' } }}>Popular</Button>
            <Button onClick={() => setFilter('latest')} sx={{ flex: { xs: '1 0 100%', sm: 'auto' } }}>Latest</Button>
          </ButtonGroup>

          <MovieList 
            filter={filter} 
            searchResults={searchResults}
            loading={loading}
          />
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
