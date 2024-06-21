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
            <img class="w-full rounded mb-4" src="https://image.tmdb.org/t/p/w500/${
              data.poster_path
            }" alt="Movie Poster">
            <h2 class="font-bold text-xl mb-2">${data.title}</h2>
            <p class="mb-2">Original Title: ${data.original_title}</p>
            <p class="mb-2 h-[2px] flex items-center">Language: ${
              data.original_language
            } <img src="./../flags/${data.original_language}.png" alt="${
        data.original_language
      } flag" class=" rounded-xs ml-2 h-5"></p>               
            <p class="mb-2">Release Year: ${data.release_date.slice(0, 4)}</p>
            <p class="mb-2">Vote Average: ${data.vote_average.toFixed(1)}</p>
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
