import { useState } from "react";
import { addToWatchlist, removeFromWatchlist } from "../utils/watchlist.js";

export function MovieCard({ movie, variant = "search", onRemoved }) {
  const [posterFailed, setPosterFailed] = useState(false);
  const posterUrl = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : null;
  const showPoster = Boolean(posterUrl) && !posterFailed;
  const rating = movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : "—";
  const onWatchlistPage = variant === "watchlist";

  function handleWatchlistAction() {
    if (onWatchlistPage) {
      removeFromWatchlist(movie.imdbID);
      onRemoved?.();
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <article className="movie-card">
      <div className="movie-poster-container">
        {showPoster ? (
          <img
            className="movie-poster"
            src={posterUrl}
            alt=""
            loading="lazy"
            onError={() => setPosterFailed(true)}
          />
        ) : (
          <div className="movie-poster-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="results-content">
        <div className="title-rating">
          <h2 className="movie-title">{movie.Title}</h2>
          <img className="star-icon" src="/images/star-icon.png" alt="" />
          <p className="movie-rating">{rating}</p>
        </div>
        <div className="time-genre-addtolist">
          <p className="movie-runtime">{movie.Runtime || "—"}</p>
          <p className="movie-genre">{movie.Genre || "—"}</p>
          <button
            type="button"
            className="watchlist-action-btn"
            onClick={handleWatchlistAction}
          >
            <img
              src={onWatchlistPage ? "/images/minus-icon.svg" : "/images/plus-icon.png"}
              alt=""
              width={16}
              height={16}
            />
            <span>{onWatchlistPage ? "Remove" : "Watchlist"}</span>
          </button>
        </div>
        <div className="movie-recap">
          <p className="movie-plot">{movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "No plot available."}</p>
        </div>
      </div>
    </article>
  );
}
