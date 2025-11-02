import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.id);

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
        />
      </Link>
      <div className="movie-info">
        <p>{movie.title}</p>
        <button onClick={() => (fav ? removeFavorite(movie.id) : addFavorite(movie))}>
          {fav ? "Remove" : "Add"}
        </button>
      </div>
    </div>
  );
}
