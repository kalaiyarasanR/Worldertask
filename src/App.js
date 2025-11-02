import React from "react";
import { Routes, Route, Navigate, useLocation} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/Movies/MovieDetails";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  console.log("location", location, user);
  // return !user ? children : <Navigate to={`${location.pathname || "/"}`} replace />;
  return !user ? children : <Navigate to={"/"} replace />
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <div className="app-root">
          <Navbar />
          <main style={{ padding: 20 }}>
            <Routes>
              <Route path="/" element={  <PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/movie/:id" element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </AuthProvider>
  );
}
