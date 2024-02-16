import { Link } from "react-router-dom"

let post = ({ data }) => {
    // console.log(data);
    return (
        <Link to={"/postdetail?id=" + `${data.post_id}`} className="postEle">
            <h2 className="post-header"> {data.post_title} || {data.post_time} </h2>
            <p className="username"><b>Author :</b> {data.author_name}</p>
            <p className="comment-count"> <b>{data.comment_count}</b> comment avalable</p>
        </Link>
    )
}

export default post