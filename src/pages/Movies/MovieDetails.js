import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb";
import { useFavorites } from "../../context/FavoritesContext";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMovieDetails(id).then(m => setMovie(m)).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  const fav = isFavorite(movie.id);

  return (
    <div className="details">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : 'https://via.placeholder.com/300x450'}
        alt={movie.title}
      />
      <div>
        <h2>{movie.title} ({movie.release_date ? new Date(movie.release_date).getFullYear() : '—'})</h2>
        <p>{movie.overview}</p>
        <button onClick={() => (fav ? removeFavorite(movie.id) : addFavorite(movie))}>
          {fav ? "Remove from Favorites" : "Add to Favorites"}
        </button>

        <div style={{ marginTop: 24 }}>
          <h4>Cast</h4>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
            {(movie.credits?.cast || []).slice(0, 10).map((c) => (
              <div key={c.cast_id} style={{ minWidth: 120 }}>
                <img src={c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : 'https://via.placeholder.com/100x150'} alt={c.name} style={{ width: '100%', borderRadius: 4 }} />
                <div style={{ fontSize: 12 }}>{c.name}</div>
                <div style={{ color: '#aaa', fontSize: 11 }}>{c.character}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
