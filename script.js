const startExploring = document.querySelector(".start-exploring-container");
const searchResults = document.querySelector(".search-results");
const searchButton = document.querySelector(".search-container button");

if (startExploring && searchResults && searchButton) {
  searchButton.addEventListener("click", () => {
    startExploring.style.display = "none";
    searchResults.style.display = "block";
  });
}
