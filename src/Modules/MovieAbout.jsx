import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';

const MovieAbout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.movies);
  const location = useLocation();
  const movie = location.state?.title;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (movie) {
      fetchMovieDetails(movie);
    }
  }, [movie]);

const fetchMovieDetails = async (title) => {
  try {
    const response = await axios.get("/.netlify/functions/fetchMovies", {
      params: {
        title: title
      }
    });
    
    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Movie not found");
    }
    
    setMovieDetails(response.data);
  } catch (error) {
    console.error("Error fetching movie details", error);
    // Handle error state in your UI
  }
};

  const isFavorite = (id) => {
    return favorites.some(fav => fav.imdbID === id);
  };

  const toggleFavorite = () => {
    if (!movieDetails) return;
    
    if (isFavorite(movieDetails.imdbID)) {
      dispatch(removeFavorite(movieDetails.imdbID));
    } else {
      dispatch(addFavorite(movieDetails));
    }
  };

  if (!movieDetails) {
    return <div className="p-10 text-white">Loading movie details...</div>;
  }

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center p-10 bg-gradient-to-br from-purple-800 to-gray-900 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row w-full max-w-5xl border border-white">
        {/* Left Side - Text Info */}
        <div className="flex-1 text-gray-800 space-y-3 pr-6">
          <h1 className="text-3xl font-bold">{movieDetails.Title}</h1>
          <p className="text-sm text-gray-600">{movieDetails.Runtime}, {movieDetails.Released?.split(' ').slice(2).join(' ')}</p>
          
          <div className="mt-3 space-y-1">
            <p><span className="font-semibold">GENRE:</span> {movieDetails.Genre}</p>
            <p><span className="font-semibold">DIRECTOR:</span> {movieDetails.Director}</p>
            <p><span className="font-semibold">PRODUCER:</span> <span className="italic">[Add manually if available]</span></p>
            <p className="pt-2 text-sm">{movieDetails.Plot}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
              🎬 Trailer
            </button>
            <button className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
              ▶️ Play
            </button>
            <button 
              className={`px-4 py-2 rounded flex items-center gap-2 cursor-pointer ${
                isFavorite(movieDetails.imdbID) 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={toggleFavorite}
            >
              {isFavorite(movieDetails.imdbID) ? '❤️ Remove Favorite' : '🤍 Add Favorite'}
            </button>
          </div>
        </div>

        {/* Right Side - Poster */}
        <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-6">
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="w-64 h-auto rounded shadow-md object-cover"
          />
            <div className="mt-2 flex justify-end">
              <button 
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
                onClick={handleHome}
              >
                ⬅️Home
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAbout;