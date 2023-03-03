import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComp = () => {
  const auth = localStorage.getItem("success");
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComp;
