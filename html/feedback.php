<?php
$ip = $_SERVER['REMOTE_ADDR'];
$datetime = date('Y-m-d H:i:s');
$ua = $_SERVER['HTTP_USER_AGENT'];
$fp = fopen("../feedback.txt","a+");
fwrite($fp,'['.$datetime.']'  . ' 异常： '.$_GET["feedback"]."问题:".$_GET["Question"]." ". $ip." 设备 ".$ua ."\n");
fclose($fp);
?>
