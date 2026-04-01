const POSTER_FALLBACK = "/images/image_33.png";

export function MovieCard({ movie }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : POSTER_FALLBACK;
  const rating = movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : "—";

  return (
    <article className="movie-card">
      <div className="movie-poster-container">
        <img
          className="movie-poster"
          src={poster}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = POSTER_FALLBACK;
          }}
        />
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
          <a href="#" className="addto-watchlist-link" onClick={(e) => e.preventDefault()}>
            <img src="/images/plus-icon.png" alt="" />
            <p>Watchlist</p>
          </a>
        </div>
        <div className="movie-recap">
          <p className="movie-plot">{movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "No plot available."}</p>
        </div>
      </div>
    </article>
  );
}
