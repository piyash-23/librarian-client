import axios from "axios";
import React, { useEffect } from "react";
import UseAuth from "../UseAuth/UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxios = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    const resInterceptor = axiosSecure.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
};

export default useAxios;
