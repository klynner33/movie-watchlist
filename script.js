const startExploring = document.querySelector(".start-exploring-container");
const searchResults = document.querySelector(".search-results");
const searchButton = document.querySelector(".search-container button");
const searchInput = document.querySelector(".search-input")

const apiKey = "6fa0f8e4";

if (startExploring && searchResults && searchButton) {
  searchButton.addEventListener("click", () => {
    startExploring.style.display = "none";
    searchResults.style.display = "block";

    const movieTitle = searchInput.value.trim();
    if (!movieTitle) {
      alert("Please type a movie title!");
      return;
    }

    searchResults.innerHTML = "";

    fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
              .then((res) => res.json())
              .then((details) => {
                if (details.Response === "True") {
                  const movieCard = document.createElement("div");
                  movieCard.classList.add("movie-card");

                  movieCard.innerHTML = `
                  <img class="movie-poster" src="${details.Poster !== "N/A" ? details.Poster : "images/image_33.png"}" />
                  <div class="results-content">
                    <div class="title-rating">
                      <h2 class="movie-title">${details.Title}</h2>
                      <img class="star-icon" src="/images/star-icon.png"/>
                      <p class="movie-rating">${details.imdbRating}</p>
                    </div>
                    <div class="time-genre-addtolist">
                      <p class="movie-runtime">${details.Runtime}</p>
                      <p class="movie-genre">${details.Genre}</p>
                      <a href="#" class="addto-watchlist-link">
                        <img src="images/plus-icon.png"/>
                        <p>Watchlist</p>
                      </a>
                    </div>
                    <div class="movie-recap">
                      <p class="movie-plot">${details.Plot}</p>
                    </div>
                  </div>
                `;

                  searchResults.appendChild(movieCard);
                }
              })
              .catch((err) =>
                console.error("Error fetching movie details:", err),
              );
          });
        } else {
          resultsContainer.innerHTML = `<p>No movies found for "${movieTitle}"</p>`;
        }
      })
      .catch((err) => console.error("Error fetching search results:", err));
  });
}

