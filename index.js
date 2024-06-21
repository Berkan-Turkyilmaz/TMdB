//URL TO FETCH PHOTOS
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


//AUTHORIZATION
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTFmMDUzMWEyOWQwNDcyYzVlMzMyYjhjNDcwNzMxNiIsInN1YiI6IjY2Njk2YzM4NjYxZGU5MWRlNGJlYjFkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EVr67T6-dyjOHxy-BbMsdDLlIJhP8KGN7-rOprBNw7o'
    }
};

//FETCHING
export function getMovies() {
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json())
        .then(response => showMovies(response.results))
        .catch(err => console.error(err));
}


//FUNCTION TO CREATE CARDS WITH OUTER SECTION AND ALL CARDS STUFFED TO MOVIECONTAINER WHICH WE CREATE IN THIS FUNCTION
function showMovies(movieinfos) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('bg-gray-900', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'xl:grid-cols-5', 'p-10');
    document.body.appendChild(movieContainer);

    movieinfos.forEach(film => {
        const { overview, original_title, poster_path, vote_average } = film;
        
        const card = document.createElement('section');
        card.classList.add('flex', 'flex-col', 'bg-orange-100', 'rounded-lg', 'w-3/4', 'h-1/2', 'border-solid', 'border-orange-500', 'border-2', 'mb-20');
        card.innerHTML = `
        
        <div class="relative">
           <div>
                <img class="cursor-pointer object-cover" src="${IMAGE_URL + poster_path}" alt="${original_title}">
                <button class="absolute top-0 right-0 flex items-center bg-white text-black border-solid border-4 border-black font-bold py-1 px-2 rounded-xl add-to-fav" data-title="${original_title}" data-overview="${overview}" data-poster="${poster_path}" data-vote="${vote_average}">
                    <img class="h-8" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/favorite-list-2003406-1688149.png" alt="Add to favourites">
                </button>
           </div>
        
            <div class="flex items-center p-6 relative font-semibold ">
               <div class="border absolute right-0 mx-2 rounded-full text-white bg-black mt-3 border-6 border-gray-800 p-2 mb-2 text-xl">${vote_average.toFixed(1)}</div>
               <div>${original_title}</div>  
            </div>
         
            <div class="absolute bottom-0 font-white font-semibold text-xs">
                <p class="p-4 overview hidden bg-white mb-2 pb-0">${overview}</p>
            </div>
        </div>
        `;
        
    //FUNCTION TO HIDE/UNHIDE THE  OVERVIEW ON CLICK
        const image = card.querySelector('img');
        image.addEventListener('click', function() {
            const overview = card.querySelector('.overview');
            overview.classList.toggle('hidden'); 
        });

      //THE CARD THAT WE CREATED IS A PART OF THE OUTER DIV  
        movieContainer.appendChild(card);
    });

    //ADD TO FAV FUNCTION FOR BUTTONS
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