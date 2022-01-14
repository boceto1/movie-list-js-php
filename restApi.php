<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: X-Requested-With");

  function connectDB ()
  {
    $mysqli = new mysqli("127.0.0.1", "root", "root", "movies");
        /* check connection */
        if ($mysqli->connect_error) {
          printf("Connect failed: %s\n", $mysqli->connect_error);
          exit();
        }
    
        /* check if server is alive */
        if (!$mysqli->ping()) {
          printf ("Error: %s\n", $mysqli->error);
        }
    return $mysqli;
  };

  function getFavoriteMovies ($mysqli)
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

  function createFavoriteMovie($mysqli, $params)
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

  $mysqli = connectDB ();
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if (strtoupper($requestMethod) == 'GET') { 
    $favoriteMovies = getFavoriteMovies ($mysqli);
    echo json_encode($favoriteMovies);
  }

  if (strtoupper($requestMethod) == 'POST') { 
    $params = [
      "id" => $_POST["id"],
      "title" => $_POST["title"],
      "year" =>  $_POST["year"],
      "poster" => $_POST["poster"]
    ];
    
    $createRes = createFavoriteMovie($mysqli, $params);
    if ($createRes === TRUE) {
      $res = ['res' => "ok"];
    } else {
      $res = ['res' => "error"];
    }
    echo json_encode($res);
  }
  if (strtoupper($requestMethod) == 'DELETE') { 
    if (!$_GET['id']) {
      $res = ['res' => "error"];
      echo json_encode($res);
      return;
    } 
    $deleteRes = deleteFavoriteMovie($mysqli, $_GET['id']);
    if ($deleteRes === TRUE) {
      $res = ['res' => "ok"];
    } else {
      $res = ['res' => "ok"];
    }
    echo json_encode($res);
  }
?>
