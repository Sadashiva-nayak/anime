
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({curstate,setcurstate}) => {
  const pathname = window.location.pathname;
const [log , setLog] = useState(false)

  const onClick = ()=>{
    if(localStorage.getItem('token')||localStorage.getItem('email'))
    {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setLog(false)
      setcurstate("sign up");
    }
    else{
      setcurstate("done");
    }
  }


  useEffect(()=>{
if(localStorage.getItem('token')||localStorage.getItem('email')){
  setLog(true)
}else{
  setLog(false)
}
  },[onClick])

  return (
    <div className='flex justify-between items-center bg-gray-800'>
       <Link to='/'><img
          src="/logo.svg"       
          alt="logo"
          width={60}
          height={80}
          className="object-contain ml-[75px] my-3"
        />
        </Link>
      { log  ? <Link to="/"><button onClick={onClick} className="mr-16 bg-white text-black px-3 py-0 rounded-[20px] h-[50px] font-bold">
          Log Out
        </button></Link>: <></>}
    </div>
  )
}

export default Navbar
