import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const collectData = async () => {
    let result = await fetch("https://backend-node-black-kappa.vercel.app/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result.result));
    localStorage.setItem("authToken", JSON.stringify(result.auth));
    navigate('/');

    
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      ></input>
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      ></input>
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      ></input>
      <button onClick={collectData} className="appbutton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
