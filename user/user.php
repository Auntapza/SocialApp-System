<?php

include_once "../dbcon.php";
header('access-control-allow-methods: *');

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $sql = "SELECT * from user where user_id like '$_GET[id]'";
        $query = mysqli_query($con, $sql);
        if (mysqli_num_rows($query) == 0) {
            $data = array(
                "code" => 404,
                "msg" => "Id not found in database"
            );
        } else {
            $data = mysqli_fetch_array($query, MYSQLI_ASSOC);
        }
    } else if (isset($_GET['username']) && isset($_GET['password'])) {
        $sql = "SELECT * from user where user_username like '$_GET[username]' and user_password like '$_GET[password]'";
        $query = mysqli_query($con, $sql);
        if (mysqli_num_rows($query) == 1) {
            $data = mysqli_fetch_assoc($query);
        } else {
            $data = array(
                "code" => 404,
                "msg" => 'Worng Username or Password'
            );
        }
    } else {
        $sql = "SELECT * from user";
        $query = mysqli_query($con, $sql);
        $data = [];
        while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (!isset($_POST['username']) || !isset($_POST['password']) || !isset($_POST['fname']) || !isset($_POST['lname'])) {
        $data = array(
            "code" => 400,
            "msg" => "Missing Data"
        );
    } else {
        $sql = "INSERT INTO user (user_username, user_password, user_fname, user_lname)
        VALUES ('$_POST[username]', '$_POST[password]', '$_POST[fname]', '$_POST[lname]')";
        $query = mysqli_query($con, $sql);
        if ($query) {
            $data = array(
                "code" => 201,
                "msg" => "INSERT DATA SUCCESSFULY"
            );
        } else {
            $data = array(
                "code" => 400,
                "msg" => "Error to insert data"
            );
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {

    $input = json_decode(file_get_contents('php://input'));

    if (!(isset($input->username) && isset($input->password) && isset($input->fname) && isset($input->lname))) {
        $data = array(
            "code" => 400,
            "msg" => "Missing Data"
        );
    } else {
        $sql = "UPDATE user set 
        user_username = '$input->username',
        user_password = '$input->password',
        user_fname = '$input->fname',
        user_lname = '$input->lname'
        where user_id = $_GET[id]
        ";
        $query = mysqli_query($con, $sql);
        if ($query) {
            $data = array(
                "code" => 201,
                "msg" => "UPDATE DATA SUCCESSFULY"
            );
        } else {
            $data = array(
                "code" => 400,
                "msg" => "Error to update data"
            );
        }
    }

}

if (isset($data)) {
    echo json_encode($data);
    $con->close();
    die();
}