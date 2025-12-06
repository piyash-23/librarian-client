import React from "react";
import { createBrowserRouter } from "react-router";
import MainLaout from "../Layouts/Main/MainLaout";
import Home from "../Pages/Main/Home/Home";
import FallbackEm from "../Components/Fallback/FallbackEm";

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
]);

export default Router;
