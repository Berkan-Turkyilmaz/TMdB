// journal.html JS
const fav_mov = localStorage.getItem("TMdB_fav");
console.log(fav_mov);

const favmov = {
  id: movie.id,
  note: null,
};
function SaveNote(movieid, note) {
  if (TMdB_fav.id) localStorage.setItem("TMdB_fav", JSON.stringify(note));
}

function DeleteAllFavourites() {
  if (
    confirm(
      "Are you sure to permamently delete \nall your favourite movies and sidenotes \nYES(Ok) or NO(Cancel)."
    )
  ) {
    localStorage.setItem("TMdB_fav", []);
  }
}

// window.addEventListener("load");

// function saveNote(movieId) {
//   const noteInput = document.getElementById("noteInput").value;
//   const fav_mov = JSON.parse(localStorage.getItem("TMdB_fav")) || {};
//   fav_mov[movieId] = noteInput;
//   localStorage.setItem("TMdB_fav", JSON.stringify(fav_mov));
//   alert("Note saved!");
// }

// function addFavorite(movieId) {
//   const fav_mov = JSON.parse(localStorage.getItem("TMdB_fav")) || {};
//   if (!fav_mov[movieId]) {
//     fav_mov[movieId] = [];
//   }
//   localStorage.setItem("TMdB_fav", JSON.stringify(fav_mov));
//   alert("Movie added to favorites with an empty notes array!");
// }
