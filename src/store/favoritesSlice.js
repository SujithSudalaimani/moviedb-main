import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const serialized = localStorage.getItem('favorites');
    return serialized ? JSON.parse(serialized) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch {
    // ignore errors
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.movies.some(movie => movie.imdbID === action.payload.imdbID);
      if (!exists) {
        state.movies.push(action.payload);
        saveFavorites(state.movies);
      }
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(movie => movie.imdbID !== action.payload);
      saveFavorites(state.movies);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;