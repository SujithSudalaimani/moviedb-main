import React, { useState, useEffect } from 'react';
import heart from "../assets/favmovie.png";
import SearchList from './SearchList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchNav = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [page, setPage] = useState(1);

  // Default fetch on mount
  useEffect(() => {
    const defaultQuery = "superman";
    setSearchQuery(defaultQuery);
    fetchMovieList(defaultQuery, 1);
  }, []);

  // Fetch from OMDb by search query
  const fetchMovieList = async (value, page) => {
    try {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: "17a1ed9e",
          s: value,
          page: page
        }
      });

      if (response.data.Response === "True" && response.data.Search) {
        setSearchList(response.data.Search);
      } else {
        setSearchList([]);
        console.log("API Error:", response.data.Error || "No movies found");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  // Handle input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(1);

    if (value.length >= 3) {
      fetchMovieList(value, 1);
    } else {
      setSearchList([]);
    }
  };

const handleFavoritesClick = () => {
  console.log("Favorites button clicked");
  navigate("/fav");
};


  return (
    <div>
      <div className="navbar bg-neutral-950 flex flex-wrap justify-between items-center px-4 py-2">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">OG Movies</a>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            className="input input-bordered w-full sm:w-48 md:w-64"
          />

          <div className="dropdown dropdown-end">
           <div
  className="btn btn-ghost btn-circle avatar cursor-pointer"
  onClick={handleFavoritesClick}
>
  <div className="w-10 rounded-full">
    <img
      alt="Favorites"
      src={heart}
    />
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Render the movie list */}
      <div className="grid justify-center bg-gradient-to-r from-red-700 to-gray-900 text-white shadow-sm px-4 py-7">
        <SearchList values={searchList} />

        <div className="flex flex-wrap justify-center gap-4 mt-4 text-white">
          <button
            className="btn"
            disabled={page === 1}
            onClick={() => {
              const newPage = page - 1;
              setPage(newPage);
              fetchMovieList(searchQuery, newPage);
            }}
          >
            Prev
          </button>

          <span className="font-semibold">Page: {page}</span>

          <button
            className="btn"
            onClick={() => {
              const newPage = page + 1;
              setPage(newPage);
              fetchMovieList(searchQuery || "superman", newPage);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchNav;