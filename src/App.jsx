import Header from './assets/component/header'
import Homepage from './assets/page/homepage';
import Footer from './assets/component/footer'
import CreatePage from './assets/page/createPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostDetail from './assets/page/postdetail';
import { createContext, useEffect, useState } from 'react';
import Loginpage from './assets/page/login';
import Register from './assets/page/register';

document.title = 'Social Network App'


export const UserDataContext = createContext()

let App = () => {
  
  const [userData, setUserData] = useState({
    "code": 404,
    "msg" : "need login to continue"
  })

  useEffect(() => {
    if (localStorage.getItem('userData') !== '{}') {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <UserDataContext.Provider value={userData}>
          <Header setUserData={setUserData}/>
          <Routes>
            <Route Component={Homepage} path='/' />
            <Route Component={CreatePage} path='/create' />
            <Route Component={PostDetail} path='/postdetail' />
            <Route element={<Loginpage setUserData={setUserData} />} path='/login'/>
            <Route element={<Register setUserData={setUserData}/>} path='/register'/>
          </Routes>
          <Footer />
        </UserDataContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;