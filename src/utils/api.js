import axios from 'axios';
import { config } from '../config';

const API_KEY = config.TMDB_API_KEY;
const BASE_URL = config.BASE_URL;

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

export const getMovieDetails = async (movieId) => {
  try {
    console.log('Fetching movie details for ID:', movieId);
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error.response ? error.response.data : error.message);
    return null;
  }
};
