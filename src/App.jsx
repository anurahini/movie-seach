import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "53c759e4";

  const searchMovies = async (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1> Movie Finder</h1>
        <p>Discover your next favorite movie</p>
      </header>

      <form className="search-form" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="message">Searching movies...</p>}
      {error && <p className="message error">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://placehold.co/300x450?text=No+Poster"
              }
              alt={movie.Title}
            />

            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p> {movie.Year}</p>
              <span className="movie-type">{movie.Type}</span>
            </div>
          </div>
        ))}
      </div>

      {!loading && movies.length === 0 && !error && (
        <p className="message">
          Search for a movie to get started 
        </p>
      )}
    </div>
  );
}
