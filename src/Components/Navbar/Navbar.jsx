import React from "react";
import Logo from "../Logo/Logo";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { useTheme } from "../../Context/Theme/ThemeProvider";

const Navbar = () => {
  const { user, logOut } = UseAuth();

  // console.log(role);
  const { currentTheme, setTheme } = useTheme();
  const handleTheme = (e) => {
    const newTheme = e.target.checked ? "light" : "dark";
    setTheme(newTheme);
  };
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-books"}>All Books</NavLink>
      </li>
      <li>
        <NavLink to={"/be-a-librarian"}>Be a librarian</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </li>
      )}
    </>
  );
  const handleSignOut = () => {
    logOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged Out Succesful",
        showConfirmButton: false,
        timer: 1000,
      });
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
            <ul className="menu menu-horizontal px-1 text-primary shadow-none">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            <label className="flex cursor-pointer gap-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                checked={currentTheme === "light"}
                onChange={handleTheme}
                value="synthwave"
                className="toggle theme-controller"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
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
                className="font-bold btn shadow-none text-primary border-0 bg-transparent hover:bg-red-400 hover:text-gray-900"
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
