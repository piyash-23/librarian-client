import React from "react";
import { createBrowserRouter } from "react-router";
import MainLaout from "../Layouts/Main/MainLaout";
import Home from "../Pages/Main/Home/Home";
import FallbackEm from "../Components/Fallback/FallbackEm";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import BeSeller from "../Pages/Main/Seller/BeSeller";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import PostBook from "../Pages/Dashboard Pages/PostBook";
import HomeDashboard from "../Pages/Dashboard Pages/HomeDashboard/HomeDashboard";

const Router = createBrowserRouter([
  // main layout
  {
    path: "/",
    Component: MainLaout,
    hydrateFallbackElement: <FallbackEm></FallbackEm>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "be-a-librarian",
        element: (
          <PrivateRoute>
            <BeSeller></BeSeller>
          </PrivateRoute>
        ),
      },
    ],
  },
  // auth layout
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },
    ],
  },
  // dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: HomeDashboard,
      },
      {
        path: "post-book",
        Component: PostBook,
      },
    ],
  },
]);

export default Router;
