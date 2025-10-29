import React, { useState } from "react";

import MovieList from "../component/MovieList";
import Watchlist from "../component/Watchlist";

const Home = () => {
  const [movies] = useState([
    { id: 1, title: "Interstellar", year: 2014 },
    { id: 2, title: "Inception", year: 2010 },
    { id: 3, title: "The Dark Knight", year: 2008 },
  ]);

  const [watchlist, setWatchlist] = useState([]);

  const toggleWatchlist = (movie) => {
    if (watchlist.find((m) => m.id === movie.id)) {
      setWatchlist(watchlist.filter((m) => m.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎬 Movies Watch</h1>
      <MovieList
        movies={movies}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
      />
      <Watchlist watchlist={watchlist} />
    </div>
  );
};

export default Home;
