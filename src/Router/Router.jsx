import React from "react";
import { createBrowserRouter } from "react-router";
import MainLaout from "../Layouts/Main/MainLaout";
import Home from "../Pages/Main/Home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLaout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default Router;
