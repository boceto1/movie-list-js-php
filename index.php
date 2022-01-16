<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TuPelicula</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="./js/script.js"></script>
</head>
<body>
  <header>
    <ul>
      <li><a href="./index.php">TuPelicula</a></li>
      <li><a href="./my-movies.php">Mis Favoritas</a></li>
    </ul>
  </header>
  <main>
    <section id="search-box">
      <form id="search-box-form">
        <label><img src="./img/search.png" alt="search-icon" width="20px" height="20px">
          <input type="text" name="title" value="" placeholder="Buscar por título"></label>
        <input type="submit" value="Buscar" />
      </form>
    </section>
    <section id="movies-box">
      <ul id="movies-list">
      </ul>
    </section>
  </main>
  <footer>
    <p>Deber Cliente - Servidor | Unir 2022</p>
  </footer>
</body>
</html>
