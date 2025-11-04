import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { useSelector } from "react-redux";
export default function Favorites() {
  const { favorites } = useFavorites();
 const {popular = [], 
    top = [], now = [], upcoming = []} = useSelector ((state) => state?.movie?.allMovies || {});
 const {popular:popularFilter, top:topFilter, now:nowFilter, upcoming:upcomingFilter} = useSelector((state) => state.movie.filterMovies || {});
  //console.log('popular data', popular)
  const allMoviesList = [
    ...(popularFilter || popular),
    ...(topFilter || top),
    ...(nowFilter || now),
    ...(upcomingFilter || upcoming)
  ]
  const favoriteMovies = allMoviesList?.filter(favorites => favorites?.isFavorite )
  console.log('allMoviesList', favoriteMovies)
  return (
    <div>
      <h2>Your Favorites</h2>
      {favoriteMovies.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="movie-grid">
          {favoriteMovies.map((m) => (  
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
