import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import Router from "./Router/Router.jsx";
import AuthProvider from "./Auth/AuthProvider/AuthProvider.jsx";
import ThemeProvider from "./Context/Theme/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={Router}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
