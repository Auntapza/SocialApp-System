import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

let LoginPage = ({ setUserData }) => {
    let navigate = useNavigate();

    let login = async (e) => {
        e.preventDefault();
        let res = await fetch(`http://localhost/PHP/netxapi/user/user.php?username=${e.target.username.value}&password=${e.target.password.value}`);
        let val = await res.text();
    
        let data = JSON.parse(val);

        if (data.code === 404) {
            alert(data.msg);
            e.target.username.value = '';
            e.target.password.value = '';
            e.target.username.focus();
        } else {
            alert('Login Successfully');
            setUserData(data);
            localStorage.setItem("userData", JSON.stringify(data))
            navigate('/');
        }
    };

    // useEffect(() => {
    //     if (localStorage.getItem('userData') != {}) {
    //         let stor = JSON.parse(localStorage.getItem('userData'))

    //         if (stor.code !== 404 && window.history) {

    //         }

    //     }
    // }, [])

    return (
        <>
            <div className="login-page">
                <div className="container">
                    <form onSubmit={login}>
                        <div className="username">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <div className="button">
                            <p>Or <Link to='/register'>Sign up?</Link></p>
                            <button type="submit">Login!!</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
