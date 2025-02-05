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
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import { searchMovies } from './utils/api'; 
import image from '../image/logoo.png'
import './App.css';
import { light } from '@mui/material/styles/createPalette';
 
// Array of background images
const backgroundImages = [
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80',
  'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
];
 
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d32f2f', // Red primary color
    },
    background: {
      default: '#1a0000',
      paper: '#2d0808',
    },
    text: {
      primary: '#ffffff',
    },
  },
});
 
function App() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
 
  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      setLoading(false);
      return;
    }
   
    setLoading(true);
    setError('');
    setSearchResults([]); // Clear previous search results
   
    try {
      const results = await searchMovies(searchQuery);
      if (results.length === 0) {
        setError('No movies found. Try a different search term.');
        setFilter('all'); // Reset to default filter if no results
      } else {
        setSearchResults(results);
        setFilter('search');
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Failed to search movies. Please try again later.');
      setFilter('all'); // Reset to default filter on error
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);
  const fetchMovies = async () => {
    try {
      const results = await searchMovies();
      setMovies(results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleBackClick = () => {
    setFilter('all');
    setSearchResults([]);
    setSearchQuery('');
  };
 
  useEffect(() => {
    fetchMovies();
   
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
        <AppBar
          position="fixed"
          sx={{
            background: isScrolled
              ? 'rgba(26, 0, 0, 0.9)'
              : 'transparent',
            boxShadow: isScrolled ? 1 : 'none',
            transition: 'all 0.3s ease-in-out',
            backdropFilter: isScrolled ? 'blur(8px)' : 'none'
          }}
        >
          <Toolbar sx={{
  justifyContent: { xs: 'center', sm: 'space-between' },
  flexWrap: 'wrap',
  minHeight: isScrolled ? '64px' : '80px',
  transition: 'min-height 0.3s ease-in-out'
}}>
  <Box component="img" src={image} color={light} alt="Logo" sx={{ height: 100, mr: 2 }} />
  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    Syntax Squad Movies
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
          backgroundColor: 'rgba(45, 8, 8, 0.8)',
          backdropFilter: 'blur(8px)',
          '&:hover': {
            backgroundColor: 'rgba(61, 8, 8, 0.9)',
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
    display: 'block', // Always display the button
    color: '#ff8a80',
    '&:hover': {
      color: '#ff4444',
      backgroundColor: 'rgba(255, 138, 128, 0.08)',
    },
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
            marginTop: '64px', // Add margin to account for fixed AppBar
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
              backgroundColor: 'rgba(26, 0, 0, 0.7)',
              zIndex: 1
            }
          }}
        >
          <Container sx={{ position: 'relative', zIndex: 2 }}>
            {filter === 'search' && (
              <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBackClick}
              sx={{
                color: '#fff',
                '&:hover': { color: '#ff4444' },
                position: 'fixed',
                top: { xs: 150 }, // Adjusts for smaller screens
                left: { xs: 10, sm: 20 },
                zIndex: 2,
                fontSize: { xs: '0.8rem', sm: '1rem' },
              }}
            >
              Back
            </Button>
            
            )}
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
              Discover your favorite movies and more.
            </Typography>
          </Container>
        </Box>
 
        <Container>
          {loading ? (
            <Typography variant="h6" sx={{ color: '#ff8a80' }}>Loading...</Typography>
          ) : error ? (
            <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>
          ) : (
            <MovieList
              filter={filter}
              searchResults={searchResults}
              loading={loading}
              movies={movies}
            />
          )}
        </Container>
       
        <Footer />
      </div>
    </ThemeProvider>
  );
}
 
export default App;