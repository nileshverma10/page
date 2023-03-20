import React, { useState, useEffect } from 'react'
import'./Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email ,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const emailData =  "eve.holt@reqres.in"
    const pass = "cityslicka"
       
    const navigate = useNavigate();
    useEffect(() => {
       const data = localStorage.getItem("token")
      if (data) {
        navigate("/home");
      }
    });
     
    const handleClick = () =>{
      console.log("email, password", email, password);
    axios
      .post("https://reqres.in/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          // localStorage.setItem("success", JSON.stringify(response.data.data));
          localStorage.setItem("token", JSON.stringify(response.data));
          // window.localStorage.removeItem("password");
          navigate("/home");
        } else {
          alert("please enter correct detail"); 
        }
      })
      .catch((error) => {
        console.log(error.message  );
      });
     if(email===emailData && pass=== password){
      alert("Login Success")
     }else {
      alert("please check your email and password")
     }
 }

  return (
    <div>
        <label className='email'>Email</label><br/>
        <input className='email-input' type="text" placeholder='Enter your email' value={email} onChange={(e) =>{
          setEmail(e.target.value)
        }} /> <br/>
        <label className='email'>Password</label><br/>
        <input  className='email-input'  type="password" placeholder='Enter your Password' value={password}  onChange={(e)=>{
          setPassword(e.target.value)
        }}/><br/>
        <button className='btn' onClick={handleClick}>Login</button><br/>
    </div>
  )
}

export default Login