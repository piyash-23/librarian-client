import React from "react";
import { Outlet } from "react-router";
import Home from "../../Pages/Main/Home/Home";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const MainLaout = () => {
  return (
    <>
      <div className="max-w-[1600px] mx-auto">
        <Navbar></Navbar>
        <Outlet>
          <Home></Home>
        </Outlet>
        <Footer />
      </div>
    </>
  );
};

export default MainLaout;
