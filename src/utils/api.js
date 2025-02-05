import axios from 'axios';
import { config } from '../config';

const API_KEY = config.TMDB_API_KEY;
const BASE_URL = config.BASE_URL;

// Search for movies by query
export const searchMovies = async (query) => {
  try {
    console.log('Searching for movies with query:', query);
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    console.log('API Response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error.response ? error.response.data : error.message);
    return [];
  }
};

// Fetch movie details by movie ID
export const getMovieDetails = async (movieId) => {
  try {
    console.log('Fetching movie details for ID:', movieId);
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'videos,credits'
      },
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    console.log('Fetching popular movies');
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    console.log('API Response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error.response ? error.response.data : error.message);
    return [];
  }
};

// Fetch latest movies
export const fetchLatestMovies = async () => {
  try {
    console.log('Fetching latest movies');
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
      },
    });
    console.log('API Response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching latest movies:', error.response ? error.response.data : error.message);
    return [];
  }
};

// Fetch trending movies
export const fetchTrendingMovies = async () => {
  try {
    console.log('Fetching trending movies');
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    console.log('API Response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error.response ? error.response.data : error.message);
    return [];
  }
};

// Fetch movie genres
export const getMovieGenres = async () => {
  try {
    console.log('Fetching movie genres');
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    console.log('API Response for genres:', response.data);
    return response.data.genres; // Returns the list of genres with their IDs
  } catch (error) {
    console.error('Error fetching genres:', error.response ? error.response.data : error.message);
    return [];
  }
};

// Fetch movies by category using genre ID
export const fetchMoviesByCategory = async (category) => {
  const genres = await getMovieGenres();
  const categoryId = genres.find(genre => genre.name.toLowerCase() === category.toLowerCase())?.id;

  if (!categoryId) {
    console.error(`Genre not found for category: ${category}`);
    return [];
  }

  try {
    console.log(`Fetching movies for category: ${category}`);
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: categoryId, // category here is the genre ID
      },
    });
    console.log('API Response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by category:', error.response ? error.response.data : error.message);
    return [];
  }
};
