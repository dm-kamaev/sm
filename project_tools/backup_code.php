#!/usr/bin/php

<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
shell_exec('cd /home/gorod/l3_school-market');
$branch = shell_exec('git rev-parse --abbrev-ref HEAD');
$branch = preg_replace('/\s+/', '', $branch);
$time = date("Ymd_His");

$folder_name = $time."__".$branch;
// echo $folder_name."\n";
$command = " tar -zcvf /home/gorod/backup/$folder_name.tar.gz /home/gorod/l3_school-market ";
echo "COMMAND: $command";
$res = shell_exec($command);
// echo "TAR: $res";
// $res = shell_exec("gzip /home/gorod/backup/$folder_name.tar");
// echo "GZIP: $res";
?>
