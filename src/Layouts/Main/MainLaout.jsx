import React from "react";
import { Outlet } from "react-router";
import Home from "../../Pages/Main/Home/Home";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import BeSeller from "../../Pages/Main/Seller/BeSeller";
import AllBooks from "../../Pages/Main/All Books/AllBooks";
import PaymentSuccess from "../../Pages/Dashboard Pages/Payment/PaymentSuccess";
import PaymentCancel from "../../Pages/Dashboard Pages/Payment/PaymentCancel";

const MainLaout = () => {
  return (
    <>
      <div className="max-w-[1600px] mx-auto">
        <Navbar></Navbar>
        <Outlet>
          <Home></Home>
          <BeSeller />
          <AllBooks />
          <PaymentSuccess />
          <PaymentCancel />
        </Outlet>
        <Footer />
      </div>
    </>
  );
};

export default MainLaout;
