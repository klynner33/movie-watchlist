import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <h1>Find your film</h1>
      <p>
        <Link to="/watchlist">My Watchlist</Link>
      </p>
    </header>
  );
}
