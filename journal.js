const favMoviesArray = JSON.parse(localStorage.getItem('favMovies')) || [];
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
    showFavouriteMovies();
});

function showFavouriteMovies() {
    const movieContainer = document.getElementById('favMovieContainer');
    
    favMoviesArray.forEach(film => {
        const { overview, original_title, poster_path, vote_average } = film;
        const card = document.createElement('div');
        card.classList.add('bg-gray-400', 'rounded-lg','text-black', 'overflow-hidden', 'shadow-lg');

        card.innerHTML = `
            <div class="h-96">
                <img class="w-full h-full object-cover" src="${IMAGE_URL + poster_path}" alt="${original_title}">
            </div>
            <div class="flex flex-col justify-between p-4">
                <div class="flex justify-between mb-6 font-bold text-2xl">
                    <h2>${original_title}</h2>
                    <p>${vote_average}/10</p>
                </div>
                <p class="font-semibold text-sm overflow-hidden overflow-ellipsis">${overview}</p>
            </div>
        `;
        movieContainer.appendChild(card);
    });
}

function deleteAllFavourites() {
    localStorage.removeItem('favMovies');
    alert('All favourite movies have been removed.');
    location.reload(); // Sayfayı yenile
}


document.querySelector('.hover\\:bg-red-700').addEventListener('click', deleteAllFavourites);


