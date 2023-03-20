import React from "react";
import "./Navbar.css";
import { Link,useNavigate  } from "react-router-dom";

const Navbar = () => {
    const data = localStorage.getItem("token" );


    const navigate = useNavigate();
    const logout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

  return (
    <div className="nav-div">
      {data ? (
        <ul>
          <li className="home">
            <Link to="/home">Home</Link>
          </li>
{/* 
          <li className="table">
            <Link to="/table">Table</Link>
          </li> */}
          <li className="logout">
            <Link onClick={logout} to="/login">
              logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
     
    </div>
  );
};

export default Navbar;
