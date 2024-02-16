import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../App";
import { useNavigate } from "react-router-dom";


let CreatePage = () => {

    let navigate = useNavigate();

    let allUserdata = useContext(UserDataContext)

    const [userData, setUserData] = useState({});    
    
    useEffect(() => {

        let data = JSON.parse(localStorage.getItem('userData'))

        if (data.code == 404) {
            navigate('/login')
        } else {
            setUserData(data.user_fname + " " + data.user_lname)
        }

    }, [])

    let addPost = (e) => {
        e.preventDefault();

        let formdata = new FormData(document.getElementById("form"))
        formdata.append('user_id', `${e.target.user_id.value}`)
        formdata.append('name', `${e.target.name.value}`)
        
        fetch('http://localhost/PHP/NetxApi/addpost.php', {
            method: 'POST',
            body: formdata
        }).then(res => res.text())
        .then(res => {
            let data = JSON.parse(res);
            if (data.code === 201) {
                window.location.href = '/';
            } else {
                alert('Error to upload Post')
            }
        })
    }

    return (
        <div>
            <div className="container">
                <form onSubmit={addPost} id="form" className="addPost">
                    <h1>Make New Post!</h1>
                    <p>Post anything to ask or tell</p>
                    <div>
                        <input type="text" name="title" id="title" required placeholder="Post Title"/>
                        <textarea name="detail" id="detail" cols="30" rows="7" required placeholder="Description"></textarea>
                        <button className="postBtn" type="submit">Post now</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default CreatePage