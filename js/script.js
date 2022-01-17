const OMDB_API_SEARCH_BY_TITLE = "https://www.omdbapi.com/?apikey=84a0253e&page=1&s=";
const OMDB_API_SEARCH_BY_ID = "https://www.omdbapi.com/?apikey=84a0253e&i=";

const LOCAL_API = "../Controller/restApiController.php";
let moviesIds = [];

$(document).ready(function () {
  // Initialize functions
  if($('#my-movies').length){
    fetchFavoriteMovies(res => renderCards(res, 'my-movies'));
  } else {
    fetchMovies('batman');
    fetchFavoriteMovies(res => {
      const fetchMoviesIds = res.map(movie => movie.id);
      moviesIds = [...fetchMoviesIds];
      console.log(moviesIds);
    });
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
  console.log('i am here fetch movie');
  $.ajax({
    type: "GET",
    url: `${OMDB_API_SEARCH_BY_ID}${id}`,
    success: function (res) {
      buildMovieInfoCard(res);
    },
  });
}

const fetchFavoriteMovies = (callbackFunction) => {
  $.ajax({
    type: "GET",
    url: `${LOCAL_API}`,
    success: function (res) {
      callbackFunction(JSON.parse(res));
    },
  });
}

const postAddFavoriteMovie = movie => {
  $.ajax({
    type: "POST",
    url: LOCAL_API,
    data: movie,
    success: function () {
      alert("Pelicula añadida a favoritas");
      $(`#${movie.id} button`).remove();
      $(`#${movie.id}`).append(`<p>Pelicula ya en tu lista</p>`);
    }
  });
}

const deleteFavoriteMovie = movieId => {
  $.ajax({
    type: "DELETE",
    url: `${LOCAL_API}?id=${movieId}`,
    success: function () {
      fetchFavoriteMovies(fetchFavoriteMovies(res => renderCards(res, 'my-movies')));
    },
  });
}

const renderCards = (movies, type='general') => {
  if (!movies || movies.length === 0) {
    const errorMessage = '<p style="color:red">No se han encontrado títulos con ese nombre</p>'
    $('#movies-box').prepend(errorMessage);
    $('#movies-list .movie-card').remove();
  } else {
    $('#movies-list .movie-card').remove();
    const cardBuilder = type === 'general' ? buildCard: buildMyMovieCard;
    movies.forEach(cardBuilder);
  }
};

const onHandleRenderMovie = movieId => {
  renderMovieInfo(movieId);
}

const addMovieToFavorite = (id, title, year, poster) => {
  postAddFavoriteMovie({ id, title, year, poster });
}

const buildCard = movie => {
  const { imdbID, Title, Year, Poster } = movie;
  const poster = Poster === 'N/A'
    ? './img/poster-placeholder.png'
    : Poster;

  const cardMovie = `
    <li id="${imdbID}" class="movie-card">
      <img 
        src=${poster}
        alt="${Title} Poster"
      >
      <h3>${Title}</h3>
      <p>${Year}</p>
      ${moviesIds.includes(imdbID)
      ? `<p>Pelicula ya en tu lista</p>`
      :`<button onclick="addMovieToFavorite('${imdbID}','${Title}','${Year}','${Poster}')">
          Añadir a favoritos
        </button>`
    }

    </li>
    `;
    $("#movies-list").append(cardMovie);
};

const buildMyMovieCard = movie => {
  const poster = movie.poster === 'N/A'
    ? './img/poster-placeholder.png'
    : movie.poster;

  const cardMovie = `
    <li id="${movie.title}" class="movie-card">
      <img 
        src=${poster}
        alt="${movie.title} Poster"
      >
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
      <button id="${movie.id}" onClick="onHandleRenderMovie(this.id)" class="info-button">Ver mas info</button>
      <button id="${movie.id}" onClick="deleteFavoriteMovie(this.id)" class="delete-button">Eliminar</button>
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
