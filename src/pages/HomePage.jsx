import { useCallback, useState } from "react";
import { searchMovies } from "../api/omdb.js";
import { MovieCard } from "../components/MovieCard.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import { StartExploring } from "../components/StartExploring.jsx";

export function HomePage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFoundMessage, setNotFoundMessage] = useState(null);

  const handleSearch = useCallback(async () => {
    const title = query.trim();
    if (!title) {
      window.alert("Please type a movie title!");
      return;
    }

    setHasSearched(true);
    setLoading(true);
    setError(null);
    setNotFoundMessage(null);
    setMovies([]);

    try {
      const { movies: list, errorMessage } = await searchMovies(title);
      if (errorMessage) {
        setNotFoundMessage(errorMessage);
        setMovies([]);
      } else {
        setMovies(list);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      {!hasSearched && <StartExploring />}
      {hasSearched && (
        <div className="search-results">
          {loading && <p className="search-results-loading">Searching…</p>}
          {error && <p className="search-results-error">{error}</p>}
          {!loading && notFoundMessage && (
            <p className="search-results-empty">{notFoundMessage}</p>
          )}
          {!loading &&
            !error &&
            movies.length === 0 &&
            !notFoundMessage && (
              <p className="search-results-empty">No movies found.</p>
            )}
          {!loading &&
            movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
        </div>
      )}
    </>
  );
}
