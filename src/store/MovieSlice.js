import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "MovieSlice",
  initialState: {  },
  reducers: {
            updateAllMovies: (state, actions) => {
                console.log(actions.payload);
                state.allMovies = actions.payload
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

export const { updateAllMovies, updateSearch, clearSearch} =
  MovieSlice.actions;

export default MovieSlice.reducer;
