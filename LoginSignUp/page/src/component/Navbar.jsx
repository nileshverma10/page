import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth = localStorage.getItem("success");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("success");
    // window.location.reload();
    navigate("/signup");
  };

  return (
    <div className="nav-div ">
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
          <Link to="/login">Login</Link>
        </li>
        <li>
          {auth ? (
            <Link onClick={logout} to="/signup">
              Logout
            </Link>
          ) : (
            <Link to="/signup">Sign Up</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
