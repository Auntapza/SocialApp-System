<?php

include_once "dbcon.php";

$query = mysqli_query($con, "select p.post_id, p.post_title, p.post_time, CONCAT(u.user_fname, ' ', u.user_lname) as author_name, COUNT(c.comment_id) as comment_count from post as p
left join comment as c on p.post_id = c.post_id 
left join user as u on p.user_id = u.user_id group by p.post_id");

$data = [];

while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
    $data[] = $row;
}

echo json_encode($data);