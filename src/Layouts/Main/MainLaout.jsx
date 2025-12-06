import React from "react";
import { Outlet } from "react-router";
import Home from "../../Pages/Main/Home/Home";
import Navbar from "../../Components/Navbar/Navbar";

const MainLaout = () => {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Outlet>
          <Home></Home>
        </Outlet>
      </div>
    </>
  );
};

export default MainLaout;
