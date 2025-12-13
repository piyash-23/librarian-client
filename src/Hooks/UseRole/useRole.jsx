import React from "react";
import UseAuth from "../UseAuth/UseAuth";
import useAxios from "../UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxios();
  const { isLoading, data: role } = useQuery({
    queryKey: ["user-role", user?.emial],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}/role`);
      return res.data.role;
    },
  });
  return { isLoading, role };
};

export default useRole;
