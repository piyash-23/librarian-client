import React from "react";
import useRole from "../Hooks/UseRole/useRole";
import UseAuth from "../Hooks/UseAuth/UseAuth";
import Forbidden from "../Components/Forbidden/Forbidden";

const LibAdmiRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { loading } = UseAuth();
  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4 w-60">
          <div>
            <div className="w-48 h-6 bg-slate-400 rounded-md" />
            <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md" />
          </div>
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-1/2 rounded-md" />
        </div>
      </div>
    );
  }
  if (role == "librarian" || role == "admin") {
    return children;
  }
  return <Forbidden />;
};

export default LibAdmiRoute;
