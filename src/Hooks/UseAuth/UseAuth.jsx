import React, { use } from "react";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";

const UseAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default UseAuth;
