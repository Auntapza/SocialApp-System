<?php

include_once "dbcon.php";

$query = mysqli_query($con, "INSERT INTO post(post_title, post_des, user_id) values ('$_POST[title]', '$_POST[detail]', '$_POST[user_id]')");
if ($query) {
    $data = array(
        "code" => 201,
        "msg" => "Post Success"
    );
} else {
    $data = array(
        "code" => 400,
        "msg" => "Error to post"
    );
}
echo json_encode($data);