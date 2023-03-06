import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Blog from "./Blog";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import Navbar from "./Navbar";
import Logout from "./Logout";
import PrivateComp from "./PrivateComp";

const Router1 = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<PrivateComp />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/logout" element={<Logout />} />
        </Route>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Router1;
