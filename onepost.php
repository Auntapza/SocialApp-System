<?php

include_once "dbcon.php";

$input = json_decode(file_get_contents('php://input'));

$query = mysqli_query($con, "select p.post_id, p.post_title, p.post_time, concat(u.user_fname, ' ', u.user_lname) as author_name, p.post_des from post as p
left join comment as c on p.post_id = c.post_id
left join user as u on p.user_id = u.user_id where p.post_id like '$input->id' group by p.post_id");

$data = mysqli_fetch_array($query, MYSQLI_ASSOC);

echo json_encode($data);