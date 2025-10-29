import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./component/MovieList";
import Watch from "./component/Watch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/watch/:title" element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;
