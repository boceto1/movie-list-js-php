<?php
class Movie {
    public $id;
    public $title;
    public $year;
    public $poster;

    function __construct($id, $title, $year, $poster) {
      $this->id = $id;
      $this->title = $title;
      $this->year = $year;
      $this->poster = $poster;
    }

    static function getFavoriteMovies($mysqli)
    {
      $sql = "SELECT * FROM favorite_movies";
      $result = $mysqli->query($sql);
      if ($result->num_rows > 0) {
        $favoriteMovies = [];
        while($row = $result->fetch_assoc()) {
          array_push($favoriteMovies, $row);
        }
        $result->close();
        return $favoriteMovies;
      }
      return [];
    }

    static function createFavoriteMovie($mysqli, $params)
    {
      $sql = "INSERT INTO favorite_movies  (id, title, year, poster)" .
              "VALUES (\"".$params["id"]."\", \"".$params["title"]."\", \"".$params["year"]."\",\"".$params["poster"]."\")";
      $result = $mysqli->query($sql);
      if ($result === TRUE) {
        return true;
      } else {
        return false;
      }
    }

    function deleteFavoriteMovie($mysqli, $movieId)
    {
      $sql = "DELETE FROM favorite_movies WHERE id=\"". $movieId ."\"";
      $result = $mysqli->query($sql);
      if ($result === TRUE) {
        return true;
      } else {
        return false;
      }
    }
  }
?>
