import React from "react";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm, selectedGenre, setSelectedGenre }) => {
  const genres = ["All", "Action", "Drama", "Romance", "Comedy", "Family", "Erotic Thriller", "Mystery & Thriller", "Horror", "Sci-Fi", "Adventure", "Crime", "Sentimental",];


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-logo">🎬 MovieZone</h2>
      </div>

      <div className="navbar-center">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-btn ${selectedGenre === genre ? "active" : ""}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
