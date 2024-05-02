<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){

  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $phone = filter_input(INPUT_POST, "phone", FILTER_VALIDATE_INT);
  $email = $_POST['email'];
  $city = $_POST['city'];
  $description = $_POST['description'];
  $arrivalTime = $_POST['arrivalTime'];

  $host = "localhost";
  $dbname = "washnrol_wnrmc_data";
  $username = "washnrol_oroke";
  $password = "Beastie2468!";

  $conn = mysqli_connect(hostname: $host,
                 username: $username,
                 password: $password,
                 database: $dbname);

  if(mysqli_connect_errno()){
    die("connection error: " . mysqli_connect_error());
  }

  $sql = "INSERT INTO book (firstName, lastName, phone, email, city, description, arrivalTime)
          VALUES (?, ?, ?, ?, ?, ?, ?)";

  $stmt = mysqli_stmt_init($conn);

  if( ! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
  }

  mysqli_stmt_bind_param($stmt, "ssissss", $firstName, $lastName, $phone, $email, $city, $description, $arrivalTime);

  mysqli_stmt_execute($stmt);
  header("Location: https://www.wnrmc.com/wnrmc/thank_you.html");
}
  ?>
