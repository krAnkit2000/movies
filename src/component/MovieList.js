import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./MovieList.css";
import allMovies from "./data";

const MovieList = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [page, setPage] = useState(1);

  // const filteredMovies = allMovies.filter((movie) => {
  //   const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
  //   return matchesSearch && matchesGenre;
  // });
const filteredMovies = allMovies.filter((movie) => {
  const matchesSearch = movie.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  // Split genre string into an array
  const movieGenres = movie.genre
    ?.split(",")
    .map((g) => g.trim().toLowerCase()); // e.g. "Action,Drama" -> ["action", "drama"]

  const matchesGenre =
    selectedGenre === "All" ||
    movieGenres.includes(selectedGenre.toLowerCase());

  return matchesSearch && matchesGenre;
});

  const moviesPerPage = 12;
  const indexOfLastMovie = page * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleNextPage = () => {
    if (indexOfLastMovie < filteredMovies.length) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedGenre]);

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <div className="movie-list-container" style={{ paddingTop: "8rem" }}>
        <div className="movie-grid">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie, index) => (
              <div
                className="movie-card"
                key={index}
              onClick={() => navigate(`/watch/${encodeURIComponent(movie.title)}`, { state: movie })}
              >
                <img src={movie.poster} alt={movie.title} />
                <h3>{movie.title}</h3>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#aaa" }}>
              No movies found 😢
            </p>
          )}
        </div>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>
            ← Prev
          </button>
          <span>Page {page}</span>
          <button onClick={handleNextPage} disabled={indexOfLastMovie >= filteredMovies.length}>
            Next →
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieList;
