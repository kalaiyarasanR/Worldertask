import React, { useEffect, useState } from "react";
import { fetchPopular, fetchTopRated, fetchNowPlaying, fetchUpcoming } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [top, setTop] = useState([]);
  const [now, setNow] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchPopular(), fetchTopRated(), fetchNowPlaying(), fetchUpcoming()])
      .then(([p, t, n, u]) => {
        setPopular(p.results || []);
        setTop(t.results || []);
        setNow(n.results || []);
        setUpcoming(u.results || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading movies...</div>;

  const section = (title, list) => (
    <section style={{ marginBottom: 24 }}>
      <h3>{title}</h3>
      <div className="movie-grid">
        {list.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  );

  return (
    <div>
      {section('Popular', popular)}
      {section('Now Playing', now)}
      {section('Top Rated', top)}
      {section('Upcoming', upcoming)}
    </div>
  );
}
