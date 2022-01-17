<?php
  include '../Model/movieModelo.php';
  include '../Model/dbConnector.php';

  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: X-Requested-With");
  
  $mysqli = connectDB();

  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if (strtoupper($requestMethod) == 'GET') { 
    $favoriteMovies = Movie::getFavoriteMovies($mysqli);
    echo json_encode($favoriteMovies);
  }

  if (strtoupper($requestMethod) == 'POST') { 
    $params = [
      "id" => $_POST["id"],
      "title" => $_POST["title"],
      "year" =>  $_POST["year"],
      "poster" => $_POST["poster"]
    ];
    
    $createRes = Movie::createFavoriteMovie($mysqli, $params);
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
    $deleteRes = Movie::deleteFavoriteMovie($mysqli, $_GET['id']);
    if ($deleteRes === TRUE) {
      $res = ['res' => "ok"];
    } else {
      $res = ['res' => "ok"];
    }
    echo json_encode($res);
  }
?>
