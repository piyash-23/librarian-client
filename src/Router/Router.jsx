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
import MyBooks from "../Pages/Dashboard Pages/My Books/MyBooks";
import UpdateBook from "../Pages/Dashboard Pages/Update Books/UpdateBook";
import AllBooks from "../Pages/Main/All Books/AllBooks";
import BookDetails from "../Pages/Main/Book Details/BookDetails";
import Approve from "../Pages/Dashboard Pages/Approve Librarian/Approve";
import MyCart from "../Pages/Main/My Cart/MyCart";
import PaymentSuccess from "../Pages/Dashboard Pages/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard Pages/Payment/PaymentCancel";
import UserPayHistory from "../Pages/Main/User Pay History/UserPayHistory";
import MyOrders from "../Pages/Dashboard Pages/My Orders/MyOrders";
import LibPayHistory from "../Pages/Dashboard Pages/Librarian Payment History/LibPayHistory";
import ManageUser from "../Pages/Dashboard Pages/User Management/ManageUser";
import ManageAllBooks from "../Pages/Dashboard Pages/Manage All Books/ManageAllBooks";
import AdminRoute from "./AdminRoute";
import LibAdmiRoute from "./LibAdmiRoute";
import MyProfile from "../Pages/Dashboard Pages/My Profile/MyProfile";

const Router = createBrowserRouter([
  // main layout
  {
    path: "/",
    hydrateFallbackElement: <FallbackEm></FallbackEm>,
    Component: MainLaout,
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
      {
        path: "all-books",
        Component: AllBooks,
      },
      {
        path: "book-details/:id",
        hydrateFallbackElement: <FallbackEm></FallbackEm>,
        element: <BookDetails></BookDetails>,
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
    hydrateFallbackElement: <FallbackEm />,
    children: [
      {
        index: true,
        Component: HomeDashboard,
      },
      {
        path: "post-book",
        element: (
          <LibAdmiRoute>
            <PostBook></PostBook>
          </LibAdmiRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibAdmiRoute>
            <MyBooks></MyBooks>
          </LibAdmiRoute>
        ),
      },
      {
        path: "update-book/:id",
        element: (
          <LibAdmiRoute>
            <UpdateBook></UpdateBook>
          </LibAdmiRoute>
        ),
      },
      {
        path: "user-payment",
        Component: UserPayHistory,
      },
      {
        path: "cart",
        Component: MyCart,
      },
      {
        path: "approve",
        element: (
          <AdminRoute>
            <Approve></Approve>
          </AdminRoute>
        ),
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-canceled",
        Component: PaymentCancel,
      },
      {
        path: "my-orders",
        element: (
          <LibAdmiRoute>
            <MyOrders></MyOrders>
          </LibAdmiRoute>
        ),
      },
      {
        path: "lib-payments",
        element: (
          <LibAdmiRoute>
            <LibPayHistory></LibPayHistory>
          </LibAdmiRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageAllBooks></ManageAllBooks>
          </AdminRoute>
        ),
        // Component: ManageAllBooks,
      },
    ],
  },
]);

export default Router;
