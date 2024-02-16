import { useNavigate } from "react-router-dom";

let register = ({ setUserData }) => {

    let navigate = useNavigate()

    let submitForm = (e) => {
        e.preventDefault();
        
        let formbody = new FormData(document.querySelector('.register-form'))

        fetch('http://localhost/PHP/NetxApi/user/user.php', {
            method: "POST",
            body: formbody
        }).then(res => res.text())
        .then(res => {
            let ress = JSON.parse(res)

            if (ress.code == 400) {
                alert(ress.msg)
            } else {
                alert("Register Success.")
                navigate('/login')
            }

        })

    }

    return (
        <div className="register">
            <div className="container">
                <form className="register-form" onSubmit={submitForm}>
                    <input type="text" name="username" id="username" required placeholder="Username"/>
                    <input type="password" name="password" id="password" required placeholder="Password"/>
                    <input type="text" name="fname" id="fname" required placeholder="Fullname"/>
                    <input type="text" name="lname" id="lname" required placeholder="Lastname"/>
                    <button type="submit">Register Now!</button>
                </form>
            </div>
        </div>
    )
}

export default register