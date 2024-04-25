<?php
$ip = $_SERVER['REMOTE_ADDR'];
$datetime = date('Y-m-d H:i:s');
$ua = $_SERVER['HTTP_USER_AGENT'];
$fp = fopen("../grade.txt","a+");
fwrite($fp,'['.$datetime.'] ' . $ip . ' 用了 '.$_GET["time"]." 答了".$_GET["count"]."个题"." 得了".$_GET["grade"]."分"." 设备 ".$ua ."\n");
fclose($fp);
?>
