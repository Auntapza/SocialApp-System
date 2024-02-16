import logo from '../emoji.png'
import '../../App.css'
import { Link } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import { UserDataContext } from '../../App'


let Header = ( { setUserData } ) => {

    let userData = useContext(UserDataContext)

    const [toggle, setToggle] = useState(false)

    const catMenu = useRef(null);

    const close = (e) => {
        if (toggle && !catMenu.current?.contains(e.target)) {
            setToggle(false);
        }
    }

    document.addEventListener('mousedown', close);

    let menuContent = []

    if (userData.code == 404) {
        menuContent.push({
            "name": "Login",
            "link": '/login'
        })
        menuContent.push({
            "name": "Register",
            "link": '/register'
        })
    } else {
        menuContent.push({
            "name": "User Setting",
            "link": '/usersetting'
        })
    }

    let handleMenu = () => {
        setToggle(!toggle)    
    }

    let logout = () => {
        setUserData({
            "code": 404,
            "msg" : "need login to continue"
          })
        localStorage.setItem('userData', JSON.stringify({
            "code": 404,
            "msg" : "need login to continue"
          }))
        window.location.href = '/'
    }

    return (
        <header>
            <div className="container">
                <div className="header-left">
                    <Link to={'/'}>
                        <img src={logo} alt="" />
                        Net-X
                    </Link>
                </div>
                <div className="header-right">
                    {userData.code !== 404 ? <Link to={'/create'} className="createPostBtn">
                        Create Post!
                    </Link> : ''}
                    <div className="hamberger" onClick={handleMenu} ref={catMenu}>
                        <span></span>
                        <span></span>
                        <span></span>

                        <ul className={toggle ? 'menu-content active' : 'menu-content'}>
                            {menuContent.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.link}>{item.name}</Link>
                                </li>
                            ))}
                            {userData.code !== 404 ? <p onClick={logout}>Logout</p> : ''}
                        </ul>
                    </div>
                </div>
            </div>   
        </header>
    )

}

export default Header;