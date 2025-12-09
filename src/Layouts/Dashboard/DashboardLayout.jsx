import React from "react";
import { Link, Outlet } from "react-router";
import HomeDashboard from "../../Pages/Dashboard Pages/HomeDashboard/HomeDashboard";
import PostBook from "../../Pages/Dashboard Pages/PostBook";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import Logo from "../../Components/Logo/Logo";
import { IoHome } from "react-icons/io5";
import { ImBook } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import MyBooks from "../../Pages/Dashboard Pages/My Books/MyBooks";
import { BiSolidUserBadge } from "react-icons/bi";

const DashboardLayout = () => {
  const { user } = UseAuth();
  const links = (
    <>
      <li>
        <Link
          to={"/"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Homepage"
        >
          <IoHome className="text-lg" />
          <span className="is-drawer-close:hidden">Homepage</span>
        </Link>
      </li>
      <li>
        <Link
          to={"/dashboard"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Dashboard"
        >
          <MdDashboard className="text-lg" />
          <span className="is-drawer-close:hidden">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          to={"/dashboard/post-book"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Publish Book"
        >
          <ImBook className="text-lg" />
          <span className="is-drawer-close:hidden">Publish Book</span>
        </Link>
      </li>
      <li>
        <Link
          to={"/dashboard/my-books"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Books"
        >
          <BiSolidUserBadge className="text-lg" />
          <span className="is-drawer-close:hidden">My Books</span>
        </Link>
      </li>
    </>
  );
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <div className="navbar-start">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <div className="px-4">
                <Logo></Logo>
              </div>
            </div>
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt={user?.displayName} src={user?.photoURL} />
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
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* Page content here */}
          <Outlet>
            <HomeDashboard />
            <PostBook />
            <MyBooks />
          </Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              {links}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
