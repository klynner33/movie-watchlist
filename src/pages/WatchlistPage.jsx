import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MovieCard } from "../components/MovieCard.jsx";
import { getWatchlist } from "../utils/watchlist.js";

export function WatchlistPage() {
  const location = useLocation();
  const [movies, setMovies] = useState(() => getWatchlist());

  useEffect(() => {
    setMovies(getWatchlist());
  }, [location.pathname]);

  useEffect(() => {
    function syncFromStorage() {
      setMovies(getWatchlist());
    }
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  if (movies.length === 0) {
    return (
      <div className="watchlist-page">
        <p>Your watchlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="watchlist-page watchlist-page--filled">
      <div className="search-results">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            variant="watchlist"
            onRemoved={() => setMovies(getWatchlist())}
          />
        ))}
      </div>
    </div>
  );
}
