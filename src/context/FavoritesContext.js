import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {updateFavourite} from '../store/MovieSlice'
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites')) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    // setFavorites(prev => {
    //   if (prev.find(f => f.id === movie.id)) return prev;
    //   return [...prev, movie];
    // });
    console.log('movie', movie);
    const movieObj = {movieId:movie?.id, isFavorite:true}
    dispatch(updateFavourite(movieObj))

  };

  const removeFavorite = (movie) => {
    // setFavorites(prev => prev.filter(f => f.id !== id));
      const movieObj = {movieId:movie?.id, isFavorite:false}
    dispatch(updateFavourite(movieObj))
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  return <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
