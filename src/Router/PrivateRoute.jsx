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
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
