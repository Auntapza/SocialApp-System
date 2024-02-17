<?php

$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "netxapp";
$port = 3311;

$con = mysqli_connect($hostname, $username, $password, $dbname, $port);

if (!$con) {
    echo "Connection Fail";
    die();
}

header('Access-control-allow-origin: *');
header('content-type: application/json');