import React from "react";
import useRole from "../../../Hooks/UseRole/useRole";
import FallbackEm from "../../../Components/Fallback/FallbackEm";
import AdminDash from "./Role Based Dashboard/AdminDash";
import LibrarianDash from "./Role Based Dashboard/LibrarianDash";
import UserDash from "./Role Based Dashboard/UserDash";

const HomeDashboard = () => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <FallbackEm />;
  } else if (role === "admin") {
    return <AdminDash />;
  } else if (role === "librarian") {
    return <LibrarianDash />;
  } else if (role === "user") {
    return <UserDash />;
  }
};

export default HomeDashboard;
