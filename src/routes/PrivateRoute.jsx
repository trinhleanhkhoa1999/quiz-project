import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>; //Redirect
  }

  return <>{children}</>;
};

export default PrivateRoute;
