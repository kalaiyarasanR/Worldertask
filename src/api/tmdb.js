const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function request(path, params = {}) {
  const url = new URL(BASE_URL + path);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('TMDB fetch failed: ' + res.status);
  return res.json();
}

export async function fetchMovies(endpoint) {
  return request(endpoint);
}

export async function fetchPopular() {
  return request('/movie/popular', { language: 'en-US', page: 1 });
}

export async function fetchNowPlaying() {
  return request('/movie/now_playing');
}

export async function fetchTopRated() {
  return request('/movie/top_rated');
}

export async function fetchUpcoming() {
  return request('/movie/upcoming');
}

export async function fetchMovieDetails(id) {
  return request('/movie/' + id, { append_to_response: 'credits,videos' });
}
