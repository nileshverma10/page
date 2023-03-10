import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth = localStorage.getItem("success");
  const userData = JSON.parse(auth);
  // console.log("zscsadasdsad", JSON.parse(auth));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("success");
    // window.location.reload();
    navigate("/signup");
  };

  return (
    <div className="nav-div ">
      {auth ? (
        <ul>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/about"> About</Link>
          </li>
          <li>
            <Link to="/contact"> Contact</Link>
          </li>
          <li>
            <Link to="/blog"> Blog </Link>
          </li>
          <li>
            <Link to="/addproduct"> AddProduct </Link>
          </li>
          <li>
            <Link to="/productlist">Product List</Link>
          </li>
          <li>
            <Link to="/update">Update List</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              logout ({userData.data.email})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
