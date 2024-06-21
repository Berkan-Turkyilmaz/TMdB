const favMoviesArray = JSON.parse(localStorage.getItem('favMovies')) || [];
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';



document.addEventListener('DOMContentLoaded', () => {
    showFavouriteMovies();
});

//Function to show your fav movies on journal page. HTML of card is little different from index page.
function showFavouriteMovies() {
    const movieContainer = document.getElementById('favMovieContainer');
    
    favMoviesArray.forEach(film => {
        const { overview, original_title, poster_path, vote_average } = film;
        const card = document.createElement('div');
        card.classList.add('flex','font-semibold', 'flex-col','m-6','text-xl', 'bg-orange-100', 'rounded-lg', 'w-3/4', 'h-1/2', 'border-solid', 'border-orange-500', 'border-2', 'mb-20');

        card.innerHTML = `
        <div>
            <div class="">
                <img class="cursor-pointer object-cover" src="${IMAGE_URL + poster_path}" alt="${original_title}">
            </div>
            
            <div class="flex items-center text-base justify-between ">
                    <div class="p-5" >${original_title}</div>
                    <div class="border mx-2 rounded-full text-white bg-black mt-3 border-6 border-gray-800 p-2 mb-2 text-xl ">${vote_average}</div>
            </div>
        </div>      
            
        `;
       

        movieContainer.appendChild(card);
    });
}

// Function to delete all fav movies
function deleteAllFavourites() {
    localStorage.removeItem('favMovies');
    alert('All favourite movies have been removed.');
    location.reload(); 
}



document.querySelector('.hover\\:bg-red-700').addEventListener('click', deleteAllFavourites);


