import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoutes = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user && user.isLoggedIn ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
