// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./MovieSlice";

const store = configureStore({
  reducer: {
    movie: MovieReducer,
  },
});

export default store;
