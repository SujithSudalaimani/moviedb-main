import { Popover } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';

const SearchList = ({ values }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.movies);
  
  // More robust data handling
  const movieList = Array.isArray(values) ? values : [];
  
  if (!movieList || movieList.length === 0) {
    return <div className="text-white text-center py-8">No movies found</div>;
  }

  const handleAbout = (title) => {
    console.log("clicked")
    navigate("/about", { state: { title } });
  };

  const handleFavourites = (movie) => {
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const isFavorite = (id) => {
    return favorites.some(fav => fav.imdbID === id);
  };

  const renderMovieDetails = (movie) => (
    <div className="text-gray-800 w-80 rounded-lg backdrop-blur-md bg-white/20 p-3">
      <div className="flex gap-4">
        {/* <div className="w-32"> */}
         <div  className="w-32 cursor-pointer"
        //   onClick={() => handleAbout(movie.Title)}
          >
  <img
    alt={movie.Title || 'Movie poster'}
    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
    className="rounded bg-gray-200 object-cover"
  />
</div>

        <div className="flex-1">
          <h3 className="text-lg font-bold">{movie.Title || 'Untitled Movie'}</h3>
          <p className="text-sm"><strong>Year:</strong> {movie.Year || 'Unknown'}</p>
          <p className="text-sm"><strong>Type:</strong> {movie.Type || 'movie'}</p>
          <p className="text-sm"><strong>IMDb:</strong> {movie.imdbID || 'N/A'}</p>
          <div className="text-right mt-2">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
              onClick={() => handleAbout(movie.Title)}
            >
              View Details
            </button>
            <button
              className={`bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center gap-2 cursor-pointer ${
                isFavorite(movie.imdbID) ? 'text-red-500' : ''
              }`}
              onClick={() => handleFavourites(movie)}
            >
              {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mx-1 max-w-2xl sm:px-6 lg:max-w-6xl lg:px-4 pt-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movieList.map((movie, index) => (
            <Popover
              key={index}
              content={renderMovieDetails(movie)}
              placement="top"
              trigger="hover"
              style={{
                backgroundColor: '#C2BBB0',
                boxShadow: 'none',
                padding: 0,
                border: 'none',
              }}
            >
              <div className="group relative border rounded-md shadow hover:shadow-lg transition cursor-pointer">
                <img
                  alt={movie.Title || 'Movie poster'}
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover"
                />
              </div>
            </Popover>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchList;