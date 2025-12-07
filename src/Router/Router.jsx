import React from "react";
import { createBrowserRouter } from "react-router";
import MainLaout from "../Layouts/Main/MainLaout";
import Home from "../Pages/Main/Home/Home";
import FallbackEm from "../Components/Fallback/FallbackEm";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLaout,
    HydrateFallback: <FallbackEm></FallbackEm>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
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
]);

export default Router;
