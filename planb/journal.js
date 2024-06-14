const TMDB_FAV_KEY = "TMdB_fav";

function getFavoriteMovies() {
  const favMovies = localStorage.getItem(TMDB_FAV_KEY);
  return favMovies ? JSON.parse(favMovies) : {};
}

function saveFavoriteMovies(favMovies) {
  localStorage.setItem(TMDB_FAV_KEY, JSON.stringify(favMovies));
}

function removeFromFavorites(movieId) {
  const favMovies = getFavoriteMovies();
  delete favMovies[movieId];
  saveFavoriteMovies(favMovies);
  displayFavoriteMovies();
}

function saveNoteToLocalStorage(movieId, note) {
  const favMovies = getFavoriteMovies();
  if (favMovies[movieId]) {
    favMovies[movieId].note = note;
    saveFavoriteMovies(favMovies);
  }
  displayFavoriteMovies();
}

async function fetchMovieById(movieId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM4MjRmOTYwNTM5Y2YzMzdhY2NiMjZlM2EwYmEzMiIsInN1YiI6IjYwMGVhYjZhMGU1OTdiMDA0MDMyOWMwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YDTy0_TlokvuXsavsDbmtYvf4ON1wn5nea5Fhw2s3js",
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayFavoriteMovies() {
  const favMovies = getFavoriteMovies();
  const favoriteMoviesDiv = document.getElementById("favorite_movies");
  favoriteMoviesDiv.innerHTML = "";

  Object.values(favMovies).forEach((movie) => {
    fetchMovieById(movie.id).then((data) => {
      const movieCard = document.createElement("div");
      movieCard.className = "card bg-white p-4 rounded shadow-md relative";

      movieCard.innerHTML = `
            <button class="bg-red-500 text-white p-2 rounded absolute top-0 right-0 mr-2 mt-2 remove-from-fav-btn">Remove from Favorites</button>
            <h2 class="font-bold text-xl mb-2">${data.title}</h2>
            <p class="mb-2">Original Title: ${data.original_title}</p>
            <p class="mb-2">Language: ${data.original_language}</p>
            <p class="mb-2">Release Year: ${movie.release_date}</p>
            <p class="mb-2">Vote Average: ${movie.vote_average}</p>
            <textarea id="note-${
              data.id
            }" class="border rounded p-2 w-full mb-2">${
        movie.note || ""
      }</textarea>
            <button class="bg-blue-500 text-white p-2 rounded mb-2 add-update-note-btn">Add/Update Note</button>
          `;

      // Remove from favorites button
      const removeFromFavBtn = movieCard.querySelector(".remove-from-fav-btn");
      removeFromFavBtn.addEventListener("click", () => {
        removeFromFavorites(movie.id);
      });

      // Add/update note button
      const addUpdateNoteBtn = movieCard.querySelector(".add-update-note-btn");
      addUpdateNoteBtn.addEventListener("click", () => {
        const note = document.getElementById(`note-${data.id}`).value.trim();
        saveNoteToLocalStorage(movie.id, note);
      });

      favoriteMoviesDiv.appendChild(movieCard);
    });
  });
}

// Initial display of favorite movies
displayFavoriteMovies();
