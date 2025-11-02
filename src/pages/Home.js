import React, { useEffect, useState } from "react";
import { fetchPopular, fetchTopRated, fetchNowPlaying, fetchUpcoming } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { updateAllMovies } from '../store/MovieSlice'
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
  // const [popular, setPopular] = useState([]);
  // const [top, setTop] = useState([]);
  // const [now, setNow] = useState([]);
  // const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {popular, top, now, upcoming} = useSelector((state) => state.movie.allMovies || {});
  const {popular:popularFilter, top:topFilter, now:nowFilter, upcoming:upcomingFilter} = useSelector((state) => state.movie.filterMovies || {});
  console.log('popular data',popular);
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchPopular(), fetchTopRated(), fetchNowPlaying(), fetchUpcoming()])
      .then(([p, t, n, u]) => {
        console.log('popular', p.results, 'top', t.results, 'now', n.results, 'upcoming', n.results);
        dispatch(updateAllMovies({
          popular: p.results,
          top: t.results,
          now: n.results,
          upcoming: u.results

        }))
        // setPopular(p.results || []);
        // setTop(t.results || []);
        // setNow(n.results || []);
        // setUpcoming(u.results || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading movies...</div>;

  const section = (title, list) => (
    <section style={{ marginBottom: 24 }}>
      <h3>{title}</h3>
      <div className="movie-grid">
        {list?.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  );

  return (
    <div>
      {section('Popular', popularFilter || popular)}
      {section('Now Playing', nowFilter || now)}
      {section('Top Rated', topFilter || top)}
      {section('Upcoming', upcomingFilter || upcoming)}
    </div>
  );
}
