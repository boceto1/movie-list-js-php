const OMDB_API_SEARCH_BY_TITLE = "https://www.omdbapi.com/?apikey=84a0253e&page=1&s=";
const OMDB_API_SEARCH_BY_ID = "https://www.omdbapi.com/?apikey=84a0253e&i=";

// Todo: Replace this with the 
const localMovies = [
  {
    Title: "Batman Begins",
    Year: "2005",
    imdbID: "tt0372784",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    Title: "Batman v Superman: Dawn of Justice",
    Year: "2016",
    imdbID: "tt2975590",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    Title: "Batman",
    Year: "1989",
    imdbID: "tt0096895",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg",
  },
  {
    Title: "Batman Returns",
    Year: "1992",
    imdbID: "tt0103776",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg",
  },
  {
    Title: "Batman Forever",
    Year: "1995",
    imdbID: "tt0112462",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },
  {
    Title: "Batman & Robin",
    Year: "1997",
    imdbID: "tt0118688",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg",
  },
  {
    Title: "The Lego Batman Movie",
    Year: "2017",
    imdbID: "tt4116284",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg",
  },
  {
    Title: "Batman: The Animated Series",
    Year: "1992–1995",
    imdbID: "tt0103359",
    Type: "series",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg",
  },
  {
    Title: "Batman: Under the Red Hood",
    Year: "2010",
    imdbID: "tt1569923",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
  },
  {
    Title: "Batman: The Dark Knight Returns, Part 1",
    Year: "2012",
    imdbID: "tt2313197",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg",
  },
];


$(document).ready(function () {
  // Initialize functions
  if($('#my-movies').length){
    renderCards(localMovies, 'my-movies');
  } else {
    fetchMovies('batman');
  }

  $("#search-box-form").submit(function (event) {
    event.preventDefault();
    $('#movies-box p').remove();
    const title = $(this).serialize().split('title=')[1];

    if (!title) {
      alert("Debes añadir un titulo");
      return;
    }
    fetchMovies(title);
  });

  $('button').click(function() {
    if (this.id.includes("-info")) {
      const id = this.id.split('-')[0];
      renderMovieInfo(id);
      return;
    }
  });

  $('#cerrar-card').click(function() {
    cerrarMovieInfoCard();
  });
});

const fetchMovies = title => {
  $.ajax({
    type: "GET",
    url: `${OMDB_API_SEARCH_BY_TITLE}${title}`,
    success: function (res) {
      renderCards(res.Search);
    },
  });
}

const fetchMovie = id => {
  $.ajax({
    type: "GET",
    url: `${OMDB_API_SEARCH_BY_ID}${id}`,
    success: function (res) {
      buildMovieInfoCard(res);
    },
  });
}

const renderCards = (movies, type='general') => {
  if (!movies) {
    const errorMessage = '<p style="color:red">No se han encontrado títulos con ese nombre</p>'
    $('#movies-box').prepend(errorMessage);
  } else {
    $('#movies-list .movie-card').remove();
    const cardBuilder = type === 'general' ? buildCard: buildMyMovieCard;
    movies.forEach(cardBuilder);
  }
};

const buildCard = movie => {
  const poster = movie.Poster === 'N/A'
    ? './img/poster-placeholder.png'
    : movie.Poster;

  const cardMovie = `
    <li id="${movie.Title}" class="movie-card">
      <img 
        src=${poster}
        alt="${movie.Title} Poster"
      >
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button>Añadir a favoritos</button>
    </li>
    `;
    $("#movies-list").append(cardMovie);
};

const buildMyMovieCard = movie => {
  const poster = movie.Poster === 'N/A'
    ? './img/poster-placeholder.png'
    : movie.Poster;

  const cardMovie = `
    <li id="${movie.Title}" class="movie-card">
      <img 
        src=${poster}
        alt="${movie.Title} Poster"
      >
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button id="${movie.imdbID}-info">Ver mas info</button>
      <button id="${movie.imdbID}-delete">Eliminar</button>
    </li>
    `;
    $("#movies-list").append(cardMovie);
};

const cerrarMovieInfoCard = () => {
  $("#movie-info").remove();
}

const renderMovieInfo = movieId => {
  cerrarMovieInfoCard();
  fetchMovie(movieId);
};

const buildMovieInfoCard = movie => {
  const poster = movie.Poster === 'N/A'
  ? './img/poster-placeholder.png'
  : movie.Poster;

  const cardInfoMovie = `
    <div id="movie-info">
      <h1>${movie.Title}</h1>
      <img 
        src=${poster}
        alt="${movie.Title} Poster"
      >
      <p><b>Director</b>: ${movie.Director}</p>
      <p><b>Trama</b>: ${movie.Plot}</p>
      <p><b>Genero</b>: ${movie.Genre}</p>
      <p><b>Fecha de Lanzamiento</b>: ${movie.Released}</p>
      <button id="cerrar-card" onClick="cerrarMovieInfoCard()">Cerrar</button>
    </div>
  `;
  $("#movies-box").append(cardInfoMovie);
};
