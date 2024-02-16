import { useContext, useEffect, useState } from "react"
import { UserDataContext } from '../../App'
import { useNavigate } from "react-router-dom"

let postDetail = () => {

    let navigate = useNavigate()

    let userData = useContext(UserDataContext)

    let urlSerch = new URLSearchParams(window.location.search)
    let id = urlSerch.get('id');

    const [post, setPost] = useState([])
    const [comment, setComment] = useState([])

    async function getPost() {
        let body = JSON.stringify({
            "id": `${id}`
        })
        let res = await fetch('http://localhost/PHP/NetxApi/onepost.php', {
            method: 'POST',
            body: body
        });
        let val = await res.text();
        let data = JSON.parse(val);
        setPost(data);
    }

    async function getComment() {
        let body = JSON.stringify({
            "id": `${id}`
        })

        let res = await fetch('http://localhost/PHP/NetxApi/postcomment.php', {
            method: "POST",
            body: body
        })
        let val = await res.text()

        let comment = JSON.parse(val)
        setComment(comment)
    }

    useEffect(() => {
        getPost()
        getComment()
    }, [])

    let addComment = (e) => {
        e.preventDefault();
     
        let formData = new FormData(document.getElementById('commentForm'));
        formData.append('id', post.post_id)
        formData.append('user_id', userData.user_id)

        if (userData.code == 404) {
            let c = confirm('You Should Login first Do you want to go to login page?')

            if (c) {
                navigate('/login')
            }
        } else {
            fetch('http://localhost/PHP/NetxApi/addcomment.php', {
                method: "POST",
                body: formData
            }).then(res => res.text())
            .then(res => {
                let data = JSON.parse(res);
                if (data.code == 201) {
                    getComment()
                    document.getElementById('comment').value = ""
                    document.getElementById('author').value = ""
                } else {
                    alert('Error to add Comment')
                }
            })
        }
    }

    return (
        <>
            <div className="Postdetail">
                <div className="container">
                    <div className="post">
                        <h2 className="post-header"> {post.post_title} || {post.post_time} </h2>
                        <p className="username"><b>Author :</b> {post.author_name}</p>
                        <p className="PostDes"><b>Description : </b> <br /><br />{post.post_des}</p>
                    </div>
                </div>
            </div>
            <div className="comment">
                <div className="container">
                    <h3>Comment</h3>
                    <form onSubmit={addComment} id="commentForm">
                        <div className="form-group">
                            <input type="text" name="comment" id="comment" required/>
                            <button type="submit">Comment!</button>
                        </div>
                    </form>
                    <div className="allcomment">
                        {comment.map((item, index) => (
                            <div className="usercomment" key={index}>
                                <h4>{item.author_name} || {item.comment_date}</h4>
                                <p>{item.comment_detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )   
}

export default postDetail