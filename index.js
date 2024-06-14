const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTFmMDUzMWEyOWQwNDcyYzVlMzMyYjhjNDcwNzMxNiIsInN1YiI6IjY2Njk2YzM4NjYxZGU5MWRlNGJlYjFkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EVr67T6-dyjOHxy-BbMsdDLlIJhP8KGN7-rOprBNw7o'
    }
};

export function getMovies() {
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json())
        .then(response => showMovies(response.results))
        .catch(err => console.error(err));
}

function showMovies(movieinfos) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('bg-gray-900', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'xl:grid-cols-5', 'gap-4', 'p-4');
    document.body.appendChild(movieContainer);

    movieinfos.forEach(film => {
        const { overview, original_title, poster_path, vote_average } = film;
        const card = document.createElement('section');
        card.classList.add('flex', 'flex-col', 'bg-gray-400', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'h-96', 'w-full');
        card.innerHTML = `
            <div class="h-2/3 w-full overflow-hidden">
                <img class="h-full w-full object-cover" src="${IMAGE_URL + poster_path}" alt="${original_title}">
            </div>
            <div class="flex flex-col justify-between p-4 h-1/3">
                <div class="flex justify-between mb-6 font-bold text-2xl">
                    <h2>${original_title}</h2>
                    <p>${vote_average}/10</p>
                </div>
                <p class="font-semibold text-sm overflow-hidden overflow-ellipsis">${overview}</p>
                <div class="flex justify-center mt-2">
                    <button class="flex items-center bg-white text-black border-solid border-4 border-black font-bold py-2 px-4 rounded-xl add-to-fav" data-title="${original_title}" data-overview="${overview}" data-poster="${poster_path}" data-vote="${vote_average}">
                        <img class="h-6 mr-2" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/favorite-list-2003406-1688149.png" alt="Add to favourites">
                        Add to my favourites
                    </button>
                </div>
            </div>
        `;
        movieContainer.appendChild(card);
    });

    document.querySelectorAll('.add-to-fav').forEach(button => {
        button.addEventListener('click', () => {
            addToFav({
                original_title: button.getAttribute('data-title'),
                overview: button.getAttribute('data-overview'),
                poster_path: button.getAttribute('data-poster'),
                vote_average: button.getAttribute('data-vote')
            });
        });
    });
}


let favMoviesArray = JSON.parse(localStorage.getItem('favMovies')) || [];

function addToFav(movie) {
    if (!favMoviesArray.some(favMovie => favMovie.original_title === movie.original_title)) {
        favMoviesArray.push(movie);
        localStorage.setItem('favMovies', JSON.stringify(favMoviesArray));
        alert(`${movie.original_title} has been added to your favourites.`);
    } else {
        alert(`${movie.original_title} is already in your favourites.`);
    }
}

getMovies();