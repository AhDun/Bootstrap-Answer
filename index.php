<?php
$ip = $_SERVER['REMOTE_ADDR'];
$datetime = date('Y-m-d H:i:s');
$ua = $_SERVER['HTTP_USER_AGENT'];
$fp = fopen("ip.txt","a+");
fwrite($fp,'['.$datetime.'] ' . $ip . ' '. $ua."\n");
fclose($fp);
?>

<!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta charset="UTF-8" name="viewport" content="width=device-width,initial-scale=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="pragma" content="no-store"  />
  <meta http-equiv="refresh" content="0;html/index.php" >


</head>
<body>


</body>
</html>