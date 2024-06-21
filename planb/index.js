const TMDB_FAV_KEY = "TMdB_fav";
const MOVIE_API_URL = "https://api.themoviedb.org/3/movie";
const SEARCH_API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM4MjRmOTYwNTM5Y2YzMzdhY2NiMjZlM2EwYmEzMiIsInN1YiI6IjYwMGVhYjZhMGU1OTdiMDA0MDMyOWMwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YDTy0_TlokvuXsavsDbmtYvf4ON1wn5nea5Fhw2s3js";

let currentPage = 1;
let currentSearchText = "";
let loading = false;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

async function fetchData(url) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function getFavoriteMovies() {
  const favMovies = localStorage.getItem(TMDB_FAV_KEY);
  return favMovies ? JSON.parse(favMovies) : {};
}

function saveFavoriteMovies(favMovies) {
  localStorage.setItem(TMDB_FAV_KEY, JSON.stringify(favMovies));
}

function saveNoteToLocalStorage(movieId, note) {
  const favMovies = getFavoriteMovies();
  if (!favMovies[movieId]) {
    favMovies[movieId] = { id: movieId, note: note };
  } else {
    favMovies[movieId].note = note;
  }
  saveFavoriteMovies(favMovies);
}

async function displayMovies(url) {
  loading = true;
  const allMovies = await fetchData(url);
  const moviesInfoDiv = document.getElementById("movies_info");

  allMovies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    moviesInfoDiv.appendChild(movieCard);
  });

  loading = false;
}
// Card HTML Markup for looped cad creation
function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.className = "card bg-white p-4 rounded shadow-md relative";

  const isFavorite = getFavoriteMovies()[movie.id];

  movieCard.innerHTML = `
    <button class="bg-${
      isFavorite ? "green" : "blue"
    }-500 text-white p-2 text-sm rounded absolute top-0 right-0 mr-2 mt-2 add-to-fav-btn focus:outline-none">${
    isFavorite ? "Favorite" : "Add to Favorites"
  }</button>
    <img class="w-full rounded mb-4" src="https://image.tmdb.org/t/p/w500/${
      movie.poster_path
    }" alt="Movie Poster">
    <h2 class="font-bold text-xl mb-2">${movie.title}</h2>
    <p class="mb-2">Original Title: ${movie.original_title}</p>
    <p class="mb-2 h-[2px] flex items-center">Language: ${
      movie.original_language
    } <img src="./flags/${movie.original_language}.png" alt="${
    movie.original_language
  } flag" class=" rounded-xs ml-2 h-5"></p>
    <p class="mb-2">Release Year: ${movie.release_date.slice(0, 4)}</p>
    <p class="mb-2">Vote Average: ${movie.vote_average.toFixed(1)}</p>
    <div class="overview opacity-0 pointer-events-none transition duration-300 absolute bottom-0 left-0 right-0 bg-white p-4 rounded shadow-md">
      <p class="font-bold text-lg mb-2">${movie.title}</p>
      <p>${movie.overview}</p>
    </div>
  `;

  // Show overview on hover
  movieCard.addEventListener("mouseenter", () => {
    movieCard
      .querySelector(".overview")
      .classList.remove("opacity-0", "pointer-events-none");
  });

  movieCard.addEventListener("mouseleave", () => {
    movieCard
      .querySelector(".overview")
      .classList.add("opacity-0", "pointer-events-none");
  });

  // Add to favorites button
  const addToFavBtn = movieCard.querySelector(".add-to-fav-btn");
  if (isFavorite) {
    addToFavBtn.textContent = "Favorite";
    addToFavBtn.classList.remove("bg-blue-500");
    addToFavBtn.classList.add("bg-green-500", "cursor-default");
  }
  addToFavBtn.addEventListener("click", () => {
    const isFavorite = getFavoriteMovies()[movie.id];
    if (isFavorite) {
      removeFromFavorites(movie.id);
      addToFavBtn.textContent = "Add to Favorites";
      addToFavBtn.classList.remove("bg-green-500", "cursor-default");
      addToFavBtn.classList.add("bg-blue-500");
    } else {
      saveNoteToLocalStorage(movie.id, "");
      addToFavBtn.textContent = "Favorite";
      addToFavBtn.classList.remove("bg-blue-500");
      addToFavBtn.classList.add("bg-green-500", "cursor-default");
    }
  });

  return movieCard;
}

async function loadMoreMovies() {
  if (!loading) {
    currentPage++;
    const url = currentSearchText
      ? `${SEARCH_API_URL}?query=${currentSearchText}&include_adult=false&language=en-US&page=${currentPage}`
      : `${MOVIE_API_URL}/popular?language=en-US&page=${currentPage}`;
    await displayMovies(url);
  }
}

async function handleSearch(event) {
  event.preventDefault();
  const searchText = document.getElementById("searchInput").value.trim();
  currentSearchText = searchText;
  currentPage = 1;
  const url = `${SEARCH_API_URL}?query=${searchText}&include_adult=false&language=en-US&page=${currentPage}`;
  const moviesInfoDiv = document.getElementById("movies_info");
  moviesInfoDiv.innerHTML = ""; // Clear existing movies
  await displayMovies(url);
}

// Event listeners for reaching page borders to fetch the next page movies
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadMoreMovies();
  }
});

document.getElementById("searchForm").addEventListener("submit", handleSearch);

// Initial display of all fetched movies
const initialUrl = `${MOVIE_API_URL}/popular?language=en-US&page=${currentPage}`;
displayMovies(initialUrl);
