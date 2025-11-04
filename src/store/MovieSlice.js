import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "MovieSlice",
  initialState: {  },
  reducers: {
            updateAllMovies: (state, actions) => {
                console.log(actions.payload);
                state.allMovies = actions.payload
            },
            updateFavourite: (state, actions) => {
        
                 const {isFavorite, movieId } = actions.payload;
                 const moviesPopularIndex = state.allMovies?.popular.findIndex(movie => movie?.id === movieId );
                 const moviesTopIndex = moviesPopularIndex === -1 && state.allMovies?.top.findIndex(movie => movie?.id === movieId );
                 const moviesNowIndex = moviesTopIndex === -1 && state.allMovies?.now.findIndex(movie => movie?.id === movieId );
                 const moviesUpcomingIndex = moviesNowIndex === -1 && state.allMovies?.upcoming.findIndex(movie => movie?.id === movieId );
                 if(moviesPopularIndex >=0){
                     const movieDtls = state.allMovies.popular[moviesPopularIndex];
                 const updatedMovieDtls = {...movieDtls, isFavorite:isFavorite};
                 state.allMovies.popular[moviesPopularIndex] = updatedMovieDtls;
                 }   
                 else if(moviesTopIndex >=0){
                              const movieDtls = state.allMovies.top[moviesTopIndex];
                 const updatedMovieDtls = {...movieDtls, isFavorite:isFavorite};
                 state.allMovies.top[moviesTopIndex] = updatedMovieDtls;
                 }
                    else if(moviesNowIndex >=0){
                              const movieDtls = state.allMovies.now[moviesNowIndex];
                 const updatedMovieDtls = {...movieDtls, isFavorite:isFavorite};
                 state.allMovies.now[moviesNowIndex] = updatedMovieDtls;
                 }
                      else if(moviesUpcomingIndex >=0){
                              const movieDtls = state.allMovies.upcoming[moviesUpcomingIndex];
                 const updatedMovieDtls = {...movieDtls, isFavorite:isFavorite};
                 state.allMovies.upcoming[moviesUpcomingIndex] = updatedMovieDtls;
                 }
            },
            updateSearch:(state, actions) => {
                console.log('search test:: ', actions?.payload);
                state.filterMovies = {
                    popular: state.allMovies?.popular.filter(movie => movie.title.toLowerCase().includes(actions.payload.toLowerCase())), 
                    top: state.allMovies?.top.filter(movie => movie.title.toLowerCase().includes(actions.payload.toLowerCase())),
                    now: state.allMovies?.now.filter(movie => movie.title.toLowerCase().includes(actions.payload.toLowerCase())), 
                    upcoming: state.allMovies?.upcoming.filter(movie => movie.title.toLowerCase().includes(actions.payload.toLowerCase()))
                }
            },
            clearSearch:(state) =>{
                state.filterMovies = []
            }
            
  },
});

export const { updateAllMovies, updateSearch, clearSearch, updateFavourite} =
  MovieSlice.actions;

export default MovieSlice.reducer;
