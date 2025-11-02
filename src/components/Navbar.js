import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchInput from './SearchMovies'
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🎬 TMDB React</Link>
      <SearchInput/>
      {user && (
        <>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      </>
           ) }
      <div className="right">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
