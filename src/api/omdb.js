const OMDB_BASE = "https://www.omdbapi.com/";

export function getApiKey() {
  const key = import.meta.env.VITE_OMDB_API_KEY;
  return typeof key === "string" ? key.trim() : "";
}

export async function searchMovies(title) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing VITE_OMDB_API_KEY. Add it to a .env file.");
  }

  const searchUrl = `${OMDB_BASE}?apikey=${encodeURIComponent(apiKey)}&s=${encodeURIComponent(title)}`;
  const searchRes = await fetch(searchUrl);
  const data = await searchRes.json();

  if (data.Response !== "True" || !Array.isArray(data.Search)) {
    return { movies: [], errorMessage: data.Error || "No results found." };
  }

  const detailResults = await Promise.all(
    data.Search.map((movie) =>
      fetch(`${OMDB_BASE}?apikey=${encodeURIComponent(apiKey)}&i=${encodeURIComponent(movie.imdbID)}`).then(
        (res) => res.json(),
      ),
    ),
  );

  const movies = detailResults.filter((d) => d.Response === "True");
  return { movies, errorMessage: null };
}
