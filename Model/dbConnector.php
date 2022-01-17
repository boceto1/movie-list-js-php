<?php
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
?>
