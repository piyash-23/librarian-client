import React from "react";
import { useLocation } from "react-router";
import UseAuth from "../Hooks/UseAuth/UseAuth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = UseAuth();

  if (loading) {
    return <></>;
  }
  return <div></div>;
};

export default PrivateRoute;
