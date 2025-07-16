import { useState, useCallback, useEffect, useRef } from 'react';
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Fab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import {
  searchMovies,
  fetchPopularMovies,
  getMovieGenres,
  fetchMoviesByCategory,
} from './utils/api';
import image from '../image/logoo.png';
import './App.css';

const backgroundImages = [
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80',
  'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
];

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#d32f2f' },
    background: { default: '#1a0000', paper: '#2d0808' },
    text: { primary: '#ffffff' },
  },
});

function App() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const movieListRef = useRef(null);
  const searchInputRef = useRef(null);

  const scrollToMovies = () => {
    setTimeout(() => {
      movieListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setShowScrollTop(y > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [popularMovies, genresData] = await Promise.all([
          fetchPopularMovies(),
          getMovieGenres(),
        ]);
        setMovies(popularMovies);
        setGenres(genresData);
        setFilter('all');
        setError('');
      } catch {
        setError('Failed to load movies or genres.');
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();

    const interval = setInterval(() => {
      setCurrentBackgroundIndex((i) => (i + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearchInput(false);
      }
    }
    if (showSearchInput) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchInput]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim() && !selectedGenre) {
      setError('Enter a search term or select a genre');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let genreId = null;
      if (selectedGenre && genres.length > 0) {
        const matchedGenre = genres.find(
          (g) => g.name.toLowerCase() === selectedGenre.toLowerCase()
        );
        genreId = matchedGenre?.id || null;
      }

      const results = await searchMovies(searchQuery, genreId);
      if (results.length === 0) {
        setError('No movies found for that search and genre.');
        setMovies([]);
        setFilter('all');
      } else {
        setMovies(results);
        setFilter('search');
        scrollToMovies();
      }
    } catch (error) {
      console.error('Search failed:', error);
      setError('Search failed. Please try again.');
      setMovies([]);
      setFilter('all');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre, genres]);

  const handleGenreChange = async (e) => {
    const selected = e.target.value;
    setSelectedGenre(selected);
    setSearchQuery('');
    setError('');
    setLoading(true);

    if (!selected) {
      try {
        const popular = await fetchPopularMovies();
        setMovies(popular);
        setFilter('all');
        setError('');
      } catch {
        setError('Failed to load popular movies.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    const genreObj = genres.find((g) => g.name.toLowerCase() === selected.toLowerCase());
    if (!genreObj) {
      setError('Genre not found.');
      setMovies([]);
      setLoading(false);
      return;
    }

    try {
      const moviesByGenre = await fetchMoviesByCategory(genreObj.id);
      if (moviesByGenre.length === 0) {
        setError('No movies found for this genre.');
        setMovies([]);
        setFilter('all');
      } else {
        setMovies(moviesByGenre);
        setFilter('genre');
        scrollToMovies();
      }
    } catch (err) {
      setError('Failed to load movies by genre.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setError('');
    setLoading(true);
    fetchPopularMovies()
      .then((results) => {
        setMovies(results);
        setFilter('all');
      })
      .catch(() => setError('Failed to load popular movies.'))
      .finally(() => setLoading(false));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ minHeight: '100vh', backgroundColor: '#1a0000', display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="fixed"
          sx={{
            background: isScrolled ? 'rgba(26, 0, 0, 0.9)' : 'transparent',
            boxShadow: isScrolled ? 1 : 'none',
            transition: '0.3s',
            backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: isScrolled ? '64px' : '80px',
              transition: '0.3s',
            }}
          >
            <Box component="img" src={image} alt="Logo" sx={{ height: 100, mr: 2 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Syntax Squad Movies
            </Typography>
          </Toolbar>

          {/* Fixed Search and Genre Selection */}
          <Box
            sx={{
              px: 2,
              pb: 2,
              backgroundColor: '#1a0000',
              zIndex: 1100,
              position: 'sticky',
              top: '80px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <FormControl
              variant="outlined"
              sx={{
                minWidth: 220,
                backgroundColor: '#2d0808',
                borderRadius: 1,
                color: '#ff8a80',
              }}
            >
              <InputLabel sx={{ color: '#ff8a80' }}>Select Genre</InputLabel>
              <Select
                value={selectedGenre}
                onChange={handleGenreChange}
                label="Select Genre"
                sx={{
                  color: '#ff8a80',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#ff8a80' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ff4444' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff4444' },
                }}
              >
                <MenuItem value="">
                  <em>-- All Genres --</em>
                </MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.name}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Search Icon and Search Input */}
            <Box ref={searchInputRef} sx={{ position: 'relative' }}>
              {!showSearchInput ? (
                <IconButton
                  onClick={() => setShowSearchInput(true)}
                  sx={{ color: '#ff8a80', '&:hover': { color: '#ff4444' } }}
                  aria-label="open search"
                >
                  <SearchIcon />
                </IconButton>
              ) : (
                <Paper
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                    setShowSearchInput(false);
                  }}
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 250,
                    backgroundColor: 'rgba(45, 8, 8, 0.8)',
                    '&:hover': { backgroundColor: 'rgba(61, 8, 8, 0.9)' },
                  }}
                >
                  <InputBase
                    autoFocus
                    sx={{ ml: 1, flex: 1, color: '#ff8a80' }}
                    placeholder="Search Movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setShowSearchInput(false);
                      }
                    }}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: '10px', color: '#ff8a80', '&:hover': { color: '#ff4444' } }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              )}
            </Box>
          </Box>
        </AppBar>

        {(searchQuery || selectedGenre) && (
          <Box sx={{ textAlign: 'center', mt: 14 }}>
            <Button
              variant="outlined"
              onClick={handleClearAll}
              sx={{
                color: '#ff8a80',
                borderColor: '#ff8a80',
                '&:hover': { borderColor: '#ff4444', color: '#ff4444' },
              }}
            >
              Clear All Filters
            </Button>
          </Box>
        )}

        <Box
          sx={{
            height: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            mt: 4,
            position: 'relative',
            backgroundImage: `url(${backgroundImages[currentBackgroundIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(26, 0, 0, 0.7)',
              zIndex: 1,
            },
          }}
        >
          <Container sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h2"
              sx={{ color: '#fff', textShadow: '2px 2px 4px rgba(211, 47, 47, 0.5)' }}
            >
              Welcome to the Cinema Experience!
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: '#ff8a80', textShadow: '1px 1px 2px rgba(211, 47, 47, 0.5)' }}
            >
              Discover your favorite movies and more.
            </Typography>
          </Container>
        </Box>

        <Container ref={movieListRef}>
          {loading ? (
            <CircularProgress sx={{ display: 'block', margin: '40px auto', color: '#ff8a80' }} />
          ) : error ? (
            <Typography variant="h6" sx={{ color: 'red', textAlign: 'center' }}>
              {error}
            </Typography>
          ) : (
            <MovieList filter={filter} searchResults={movies} loading={loading} movies={movies} />
          )}
        </Container>

        {showScrollTop && (
          <Fab
            color="primary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              zIndex: 1000,
              bgcolor: '#d32f2f',
              color: 'white',
              '&:hover': { bgcolor: '#b71c1c' },
            }}
            aria-label="scroll back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        )}

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
