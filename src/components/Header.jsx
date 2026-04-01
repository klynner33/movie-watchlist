import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();
  const onWatchlist = pathname === "/watchlist";

  return (
    <header>
      <h1>Find your film</h1>
      <p>
        {onWatchlist ? (
          <Link to="/">Search for movies</Link>
        ) : (
          <Link to="/watchlist">My Watchlist</Link>
        )}
      </p>
    </header>
  );
}
