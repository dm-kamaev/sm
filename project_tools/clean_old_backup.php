#!/usr/bin/php

<?php
// получить все файлы из директории
$files = array_diff(scandir("/home/gorod/backup/"), array('.', '..'));
$cur_time = date("Ymd");
print_r(get_date_info($cur_time));
// foreach ($files as $file) {
//     // echo "Текущее значение переменной \$a: $file.\n";
//     $date = split("__", $file)[0];
//     $yyyy_mm_dd = split('_', $date)[0];
//     // $ar_yyyy_mm_dd = split('', $yyyy_mm_dd);
//     // $ar_yyyy_mm_dd = preg_split("//", $yyyy_mm_dd);
//     $year = $yyyy_mm_dd[0].$yyyy_mm_dd[1].$yyyy_mm_dd[2].$yyyy_mm_dd[3];
//     $month = $yyyy_mm_dd[4].$yyyy_mm_dd[5];
//     $day = $yyyy_mm_dd[6].$yyyy_mm_dd[7];
//     echo "$year $month $day";
//     // print_r($yyyy_mm_dd[0]);
// }


function get_date_info() {
  // $year = $yyyy_mm_dd[0].$yyyy_mm_dd[1].$yyyy_mm_dd[2].$yyyy_mm_dd[3];
  // $month = $yyyy_mm_dd[4].$yyyy_mm_dd[5];
  // $day = $yyyy_mm_dd[6].$yyyy_mm_dd[7];
  return array(
    "year" => 1
    // "year" => $yyyy_mm_dd[0].$yyyy_mm_dd[1].$yyyy_mm_dd[2].$yyyy_mm_dd[3],
    // "month" => $yyyy_mm_dd[4].$yyyy_mm_dd[5],
    // "day" => $yyyy_mm_dd[6].$yyyy_mm_dd[7]
  );
}
// print_r($files);
// $branch = shell_exec('git rev-parse --abbrev-ref HEAD');
// $branch = preg_replace('/\s+/', '', $branch);
// $time = date("Ymd_His");

// $folder_name = $time."__".$branch;
// // echo $folder_name."\n";
// $command = " tar -cvf /home/gorod/backup/$folder_name.tar /home/gorod/l3_school-market ";
// echo "COMMAND: $command";
// $res = shell_exec($command);
// echo "TAR: $res";
// $res = shell_exec("gzip /home/gorod/backup/$folder_name.tar");
// echo "GZIP: $res";
?>


