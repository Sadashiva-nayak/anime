import React, { useState} from 'react'
import Navbar from './components/Navbar'
import { Route , Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Login from './components/Login'
import Alert from './components/Alert';
import Home from './components/Home';
import Description from './components/Description'

const App = () => {
  const [curstate,setcurstate]=useState("sign up");
  const [alert,setAlert]=useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 2000);
}

  return (
    <>
      <Alert alert={alert} />
      <div className="max-w-7xl mx-auto bg-[#0F1117]">
      <Navbar setcurstate={setcurstate}/>
      <Routes>
      <Route path='/Home' element={<Home curstate={curstate} setcurstate={setcurstate}/>} />
      <Route path='/' element={<Login curstate={curstate} setcurstate={setcurstate} showAlert={showAlert}/>} />
      <Route path='/description' element={<Description/>} />
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App
