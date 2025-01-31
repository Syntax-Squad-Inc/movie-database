import { useState, useCallback } from 'react';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
    </ThemeProvider>
  );
}

export default App;
