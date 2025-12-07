import React from "react";
import { Outlet } from "react-router";
import Login from "../../Pages/AuthPages/Login";
import Logo from "../../Components/Logo/Logo";

const AuthLayout = () => {
  return (
    <>
      <div className="max-w-[1600px] mx-auto text-white">
        <div>
          <Logo></Logo>
        </div>
        <Outlet>
          <Login></Login>
        </Outlet>
      </div>
    </>
  );
};

export default AuthLayout;
