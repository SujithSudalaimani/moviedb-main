import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../store/favoritesSlice";

const Favourites = () => {
  const dispatch = useDispatch();
  const favList = useSelector(state => state.favorites.movies);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">My Favourite Movies</h2>

      {favList.length === 0 ? (
        <p className="text-center text-gray-600">No favourites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favList.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{movie.Title}</h3>
              <p className="text-sm text-gray-500 mb-2">{movie.Year}</p>
              <button
                onClick={() => dispatch(removeFavorite(movie.imdbID))}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 mt-auto"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;