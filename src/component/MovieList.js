import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./MovieList.css";

// ✅ Import both your data sources
import mixMovies from "./data/mixmovies";
import yearMovies from "../component/data/yearsmovies";

// ✅ Merge both data sources into one array
const allMovies = [...mixMovies, ...yearMovies];
const MovieList = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [page, setPage] = useState(1);

  // ✅ Filtering logic
  const filteredMovies = allMovies.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Handle both string ("Action, Drama") and array (["Action", "Drama"]) genres
    const movieGenres = Array.isArray(movie.genre)
      ? movie.genre.map((g) => g.toLowerCase())
      : movie.genre?.split(",").map((g) => g.trim().toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      movieGenres?.includes(selectedGenre.toLowerCase());

    const matchesYear =
      selectedYear === "All" || movie.year === Number(selectedYear);

    return matchesSearch && matchesGenre && matchesYear;
  });

  // ✅ Pagination
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
  }, [searchTerm, selectedGenre, selectedYear]);

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <div className="movie-list-container" >
        <div className="movie-grid">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie, index) => (
              <div
                className="movie-card"
                key={index}
                onClick={() =>
                  navigate(`/watch/${encodeURIComponent(movie.title)}`, {
                    state: movie,
                  })
                }
              >
                {movie.poster ? (
                  <img loading="lazy" src={movie.poster} alt={movie.title} />
                ) : (
                  <div className="no-poster">No Poster</div>
                )}
                <h3>{movie.title}</h3>
              </div>
            ))
          ) : (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#aaa",
              }}
            >
              No movies found 😢
            </p>
          )}
        </div>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>
            ← Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastMovie >= filteredMovies.length}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieList;
