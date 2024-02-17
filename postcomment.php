<?php
include_once "dbcon.php";

$input = json_decode(file_get_contents('php://input'));

$query = mysqli_query($con, "select c.comment_date, c.comment_detail, CONCAT(u.user_fname, ' ', u.user_lname) as author_name from comment as c
left join user as u on ser_id = u.user_id
where post_id = $input->id");

$data = [];
while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
    $data[] = $row;
}

echo json_encode($data);