<?php

include_once "dbcon.php";

$query = mysqli_query($con, "INSERT into comment (comment_detail, post_id, user_id) values ('$_POST[comment]', '$_POST[id]', '$_POST[user_id]')");
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