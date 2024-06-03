import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = ({ curstate, setcurstate, showAlert }) => {
    const navigate = useNavigate();

    const info=async()=>{
      try {  
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
          navigate("/Home")
          showAlert(`Hello ${json.name}`, "success");
      } catch (error) {
        console.log(error);
      }
    }
useEffect(()=>{
    if(localStorage.getItem('email'))
      {
        navigate("/Home")
        const email=localStorage.getItem('email');
        showAlert(`Hello ${email}`, "success");
      }
      else if(localStorage.getItem('token')){
        info();
      }
},[])


  const host = " http://localhost:3002";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const [showPassword, setshowpassword] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (curstate === "login") {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/Home");
        showAlert("logged in successfully", "success");
        setcurstate("done");
      } else {
        showAlert("invalid credentials", "error");
      }
    } else if (curstate === "reset") {
      const response = await fetch(`${host}/api/auth/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/Home");
        showAlert("Password Reset Successfully", "success");
        setcurstate("done");
      } else {
        showAlert(json.error, "error");
      }
    } else {
      const { name, email, password } = credentials;

      const res = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=0da07686f4b94dda8df2dfb8e5459671&email=${email}`);

      if (res.data.deliverability == "DELIVERABLE") {
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
              });
              const json = await response.json();
      
              if (json.success) {
                navigate("/Home");
                localStorage.setItem("token", json.authtoken);
                showAlert("logged in successfully", "success");
                setcurstate("done");
              } else {
                showAlert(json.errors[0].msg, "error");
              }   
        } catch (error) {
            showAlert("User with this Email already exists", "error");
        }
      }
      else{
            showAlert("This email doesn't exist", "error");
      }
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, delay: 0.25 }}
      className="z-10 w-[90vw] h-[80vh] bg-hero bg-center bg-cover bg-no-repeat grid"
    >
      <form
        id="form"
        onSubmit={handleSubmit}
        action=""
        className=" place-self-center text-[#808080] bg-white flex flex-col gap-4 py-6 px-7 rounded-lg text-sm animate-fade"
      >
        <div className="flex justify-between items-center text-black">
          {curstate !== "reset" && (
            <h1 className="text-[20px]">
              {curstate == "login" ? "login" : "sign up"}
            </h1>
          )}
          {curstate == "reset" && (
            <h1 className="text-[20px]">Reset Password</h1>
          )}
        </div>
        <div className="flex flex-col gap-5">
          {curstate === "login" || curstate == "reset" ? (
            <></>
          ) : (
            <input
              onChange={onChange}
              type="text"
              name="name"
              placeholder="your name"
              className=" rounded-md p-2 outline-none border-[1px] border-black text-white"
              required
            />
          )}
          <input
            onChange={onChange}
            type="email"
            placeholder="enter your email"
            name="email"
            className=" rounded-md p-2 outline-none border-[1px] border-black text-white"
            required
          />
          <input
            onChange={onChange}
            name="password"
            type={showPassword == "text" ? "text" : "password"}
            placeholder="enter password"
            className=" rounded-md p-2 outline-none border-[1px] border-black text-white"
            required
          />
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <input
              type="checkbox"
              onClick={() => {
                showPassword == "password"
                  ? setshowpassword("text")
                  : setshowpassword("password");
              }}
              className=""
            />
            <p className="">Show Password</p>
          </div>
          {curstate === "login" ? (
            <p
              onClick={() => setcurstate("reset")}
              className="cursor-pointer underline"
            >
              Forgot Password?
            </p>
          ) : (
            <></>
          )}
        </div>
        {curstate !== "reset" && (
          <button
            type="submit"
            className="p-2 rounded-md text-sm border-none text-white bg-[tomato]"
          >
            {curstate === "sign up" ? "create account" : "login"}
          </button>
        )}
        {curstate == "reset" && (
          <button
            type="submit"
            className="p-2 rounded-md text-sm border-none text-white bg-[tomato]"
          >
            Reset Password
          </button>
        )}
        <div className="flex items-start gap-2 -mt-2">
          <input type="checkbox" className="mt-1" required />
          <p className="">
            By continuing, i agree to the terms of use & privacy policy
          </p>
        </div>
        {curstate === "login" ? (
          <p className="">
            Create a new account?{" "}
            <span
              className="text-[tomato] cursor-pointer font-[500]"
              onClick={() => setcurstate("sign up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="">
            Already have an account?{" "}
            <span
              className="text-[tomato] cursor-pointer font-[500]"
              onClick={() => setcurstate("login")}
            >
              login here
            </span>
          </p>
        )}
      <GoogleLogin
  onSuccess={credentialResponse => {
    const decoded = jwtDecode(credentialResponse?.credential);
    localStorage.setItem("email", decoded.email);
    navigate("/Home");
    showAlert("logged in successfully", "success");
  }}
  onError={() => {
    navigate("/");
    showAlert("Unable to Sign in","error");
  }}
/>
      </form>
    </motion.div>
    </>
  );
};

export default Login;
