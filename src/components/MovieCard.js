import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Button from 'react-bootstrap/Button';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
export default function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.id);
  useEffect(() => {

  }, []) 
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
        {/* <Button variant="success" onClick={() => (fav ? removeFavorite(movie.id) : addFavorite(movie))}>
          {fav ? "Remove" : "Add"}
        </Button> */}
        <div className="moviedetailsinfo">
          <Link to={`/movie/${movie.id}`}>
        <Button className="viewdetlsbtn"> <BsEyeFill style={{marginRight: '1px'}}/> View Info</Button>
        </Link>
        <Button
  variant={movie?.isFavorite ? "danger" : "success"}
  onClick={() => (movie?.isFavorite ? removeFavorite(movie) : addFavorite(movie))} 
  className="addremovebtns"
>
  {movie?.isFavorite ? (
    <>
      <BsHeartFill style={{ marginRight: "6px" }} />
      Remove
    </>
  ) : (
    <>
      <BsHeart style={{ marginRight: "6px" }} />
      Add
    </>
  )}
</Button>
</div>
      </div>
    </div>
  );
}
