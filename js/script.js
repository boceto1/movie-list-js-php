const OMDB_API_SEARCH_BY_TITLE = "https://www.omdbapi.com/?apikey=84a0253e&page=1&s=";

$(document).ready(function () {
  // Initialize functions
  fetchMovies('batman');

  $("#search-box-form").submit(function (event) {
    event.preventDefault();
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

const renderCards = (movies) => {
  $('#movies-list .movie-card').remove();
  movies.forEach(buildCard);
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
    $("#movies-list ").append(cardMovie);
};

// Check this code para ver si funciona
// $(document).ready( function() {   // Esta parte del código se ejecutará automáticamente cuando la página esté lista.
//   $("#botonenviar").click( function() {     // Con esto establecemos la acción por defecto de nuestro botón de enviar.
//       if(validaForm()){                               // Primero validará el formulario.
//           $.post("enviar.php",$("#formdata").serialize(),function(res){
//               $("#formulario").fadeOut("slow");   // Hacemos desaparecer el div "formulario" con un efecto fadeOut lento.
//               if(res == 1){
//                   $("#exito").delay(500).fadeIn("slow");      // Si hemos tenido éxito, hacemos aparecer el div "exito" con un efecto fadeIn lento tras un delay de 0,5 segundos.
//               } else {
//                   $("#fracaso").delay(500).fadeIn("slow");    // Si no, lo mismo, pero haremos aparecer el div "fracaso"
//               }
//           });
//       }
//   });
// });
