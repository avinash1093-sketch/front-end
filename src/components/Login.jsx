import React, { useEffect } from "react";
import { useNavigate  } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

    useEffect(()=>{
      const auth = localStorage.getItem('user');
      if (auth) {
        navigate('/')
      }
    },[]);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("authToken", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Incorrect Login Credentials");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
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
      <button onClick={handleLogin} className="appbutton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
