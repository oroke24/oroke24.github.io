<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){

  // Basic anti-spam checks: honeypot and minimum submission time
  $honeypot = isset($_POST['website']) ? trim($_POST['website']) : '';
  $form_time = isset($_POST['form_time']) ? intval($_POST['form_time']) : 0;
  $now = time();

  // ensure logs directory exists
  $logsDir = __DIR__ . '/logs';
  if (!is_dir($logsDir)) {
    @mkdir($logsDir, 0755, true);
  }

  // If honeypot is filled, treat as spam and stop.
  if ($honeypot !== '') {
    @file_put_contents($logsDir . '/spam_log.txt', date('c') . " - honeypot hit - " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . " - ". json_encode($_POST) . "\n", FILE_APPEND);
    header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
    exit;
  }

  // If the form was submitted too quickly (e.g. less than 5 seconds), treat as bot
  if ($form_time && ($now - $form_time) < 5) {
    @file_put_contents($logsDir . '/spam_log.txt', date('c') . " - too-fast submit - " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . " - delta=" . ($now - $form_time) . " - " . json_encode($_POST) . "\n", FILE_APPEND);
    header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
    exit;
  }

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
