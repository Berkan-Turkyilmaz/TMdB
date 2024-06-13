
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTFmMDUzMWEyOWQwNDcyYzVlMzMyYjhjNDcwNzMxNiIsInN1YiI6IjY2Njk2YzM4NjYxZGU5MWRlNGJlYjFkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EVr67T6-dyjOHxy-BbMsdDLlIJhP8KGN7-rOprBNw7o'
    }
  };
  
    function getMovies () {
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json()) 
        .then(response => showMovies(response.results))
        .catch(err => console.error(err));

    }
 
  function showMovies(movieinfos) {

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('bg-gray-700','grid','flex','grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'xl:grid-cols-5','flex', 'items-center' );
    document.body.appendChild(movieContainer);

    movieinfos.forEach(film => {
        const {overview, original_title, poster_path, vote_average} = film
        const card = document.createElement('section');
        card.classList.add('grid','text-2xl','items-center', 'bg-gray-400');
        card.innerHTML = `
        <div>
                <div class="imagemovie1">
                    <img class=" " style="width: 500px; "
                        src="${IMAGE_URL+poster_path}"
                        alt="movie1">
                </div> 
                <div id="info-point-overview" class="text-gray-900" style="width: 500px;">
                    <div id="movie1info" class="flex text-3xl">
                        <h2 class="text-5xl">${original_title}</h2>
                        <span id="movie1score" class="pl-40 ">${vote_average}/10</span>
                    </div>
                    <br>
                    <div class="m-3" id="overview">
                        <p>
                        ${overview}
                        </p>
                    </div>
                    
                </div>
            </div>
            <div class="flex justify-center ">
            <div id="addingfavourite" class="flex justify-center tm-3 p-1 items-center border border-black rounded-xl text-xl " style="width:300px;">
                <img class=" "  style="height:30px" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/favorite-list-2003406-1688149.png" alt="">
                <button class=" text-black  font-bold">Add to my favourites</button>
            </div>
        </div>
        ` ;
        movieContainer.appendChild(card);         
    }
    );

  }

 
 getMovies();

