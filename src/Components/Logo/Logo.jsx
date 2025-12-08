import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <>
      <Link to={"/"}>
        <div className="flex justify-center items-center">
          <img className="w-[50px]" src={logo} alt="" />
          <h1 className="font-bold text-[20px] text-primary">Librarian</h1>
        </div>
      </Link>
    </>
  );
};

export default Logo;
