import React from "react";
import { Navigate, useLocation } from "react-router";
import UseAuth from "../Hooks/UseAuth/UseAuth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loading, user } = UseAuth();
  // console.log(location);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
