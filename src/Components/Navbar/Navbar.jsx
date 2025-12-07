import React from "react";
import Logo from "../Logo/Logo";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const links = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>All Books</a>
      </li>
      <li>
        <a>Be a librarian</a>
      </li>
    </>
  );
  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged Out Succesful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // some code
      });
  };
  return (
    <div>
      <div>
        <div className="navbar relative z-50 py-4 pb-5">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white shadow-none">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">{user?.displayName}</a>
                    </li>
                    <li>
                      <a>{user?.email}</a>
                    </li>
                    <li>
                      <button onClick={handleSignOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link
                to={"/login"}
                className="font-bold btn shadow-none text-white border-0 bg-transparent hover:bg-red-400 hover:text-gray-900"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
