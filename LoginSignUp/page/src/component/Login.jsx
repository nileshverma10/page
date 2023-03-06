import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("success");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = () => {
    console.log("email, password", email, password);
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          localStorage.setItem("success", JSON.stringify(response.data));
          navigate("/");
        } else {
          alert("please enter correct detail");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div>
        <h3 className="fname">Email</h3>
        <input
          className="finput"
          type="text"
          placeholder="Enter Your Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <h3 className="fname">Password</h3>
        <input
          className="finput"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
