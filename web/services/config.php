<?php

function getStringBetween($string, $start, $end)
{
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}

function startsWith($haystack, $needle)
{
    $length = strlen($needle);
    return (substr($haystack, 0, $length) === $needle);
}

$array = file("/etc/ossim/ossim_setup.conf");

$dbSection = false;
$password = "";
$servername = "";
$username = "";
$dbname = "alienvault";

foreach ($array as $line) {

    if (!$dbSection) {
        $dbSection = (strpos($line, '[database]') !== false);
    }

    if ($dbSection && startsWith($line, "pass=")) {
        $password = getStringBetween($line, "pass=", "\n");
    }
    if ($dbSection && startsWith($line, "db_ip=")) {
        $servername = getStringBetween($line, "db_ip=", "\n");
    }
    if ($dbSection && startsWith($line, "user=")) {
        $username = getStringBetween($line, "user=", "\n");
    }

}
?>