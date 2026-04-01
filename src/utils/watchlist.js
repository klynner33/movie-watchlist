const KEY = "watchlist";

export function getWatchlist() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function addToWatchlist(movie) {
  const list = getWatchlist();
  if (list.some((m) => m.imdbID === movie.imdbID)) return;
  localStorage.setItem(KEY, JSON.stringify([...list, movie]));
}

export function removeFromWatchlist(imdbID) {
  const list = getWatchlist().filter((m) => m.imdbID !== imdbID);
  localStorage.setItem(KEY, JSON.stringify(list));
}
