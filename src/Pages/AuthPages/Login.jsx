import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/UseAxios/useAxios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, signInWithMail, googleSign } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    // console.log("form data:", data);
    signInWithMail(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // console.log(errorCode, errorMessage);

        if (errorCode || errorMessage) {
          Swal.fire({
            icon: "error",
            title: errorCode,
            text: "Wrong credentials",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleGoogle = () => {
    googleSign()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        axiosSecure.post("/user", userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: `You are a user ${user.displayName}`,
              text: "Welcome to librarian",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        navigate(location?.state || "/");
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        if (errorCode || errorMessage || email) {
          Swal.fire({
            icon: "error",
            title: "SOmething Wrong",
            text: "Wrong credentials",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-10 text-white relative flex flex-col justify-center">
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-600 rounded-full opacity-20 -translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400 rounded-full opacity-30 translate-x-10 translate-y-10"></div>

            <h2 className="text-3xl font-bold mb-2 relative z-10">
              Welcome Back
            </h2>
            <p className="text-sm mb-8 opacity-90 relative z-10">
              Login to get started
            </p>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="space-y-4 relative z-10"
            >
              {/* USERNAME */}
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg text-gray-200 focus:outline-none"
                  {...register("email", {
                    required: "email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-gray-200 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg text-gray-200 focus:outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: 8,
                    pattern:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm text-gray-200 cursor-pointer"
                >
                  {showPassword ? <RiEyeCloseFill /> : <FaRegEye />}
                </span>
                {errors.password?.type === "required" && (
                  <p className="text-gray-200 text-xs mt-1 font-bold">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-gray-200 text-xs mt-1 font-bold">
                    Password must be 8 characters long
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-gray-200 text-xs mt-1 font-bold">
                    Password must contain at least one letter, one number, and
                    one special character
                  </p>
                )}
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full cursor-pointer bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg"
              >
                Login
              </button>

              <p className="text-xs text-center opacity-80">
                <Link>Forgot Password?</Link>
              </p>
            </form>
            <div className="relative z-10">
              <p className="text-white font-bold text-lg text-center my-3">
                Or
              </p>
              <button
                onClick={handleGoogle}
                className="bg-[linear-gradient(#e9e9e9,#e9e9e9_50%,#fff)] group w-full h-16 cursor-pointer
               inline-flex transition-all duration-300 overflow-visible p-1 rounded-full"
              >
                <div className="w-full h-full bg-[linear-gradient(to_top,#ececec,#fff)] overflow-hidden shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] p-1 rounded-full hover:shadow-none duration-300">
                  <div className="w-full h-full text-xl gap-x-0.5 gap-y-0.5 justify-center text-[#101010] bg-[linear-gradient(#f4f4f4,#fefefe)] group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] duration-200 items-center text-[18px] font-medium gap-4 inline-flex overflow-hidden px-4 py-2 rounded-full black group-hover:text-blue-600">
                    <svg
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 64 64"
                      height="32px"
                      width="24px"
                    >
                      <g
                        fillRule="evenodd"
                        fill="none"
                        strokeWidth={1}
                        stroke="none"
                      >
                        <g
                          fillRule="nonzero"
                          transform="translate(3.000000, 2.000000)"
                        >
                          <path
                            fill="#4285F4"
                            d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                          />
                          <path
                            fill="#34A853"
                            d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                          />
                          <path
                            fill="#FBBC05"
                            d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                          />
                          <path
                            fill="#EB4335"
                            d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                          />
                        </g>
                      </g>
                    </svg>
                    <span className="ml-2">Sign In with Google</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
              New Here?
            </h2>
            <p className="text-gray-600 max-w-xs mb-6">
              Get exclusive access to unlimited benefits. Sign up now and start
              exploring our new world.
            </p>
            <Link
              to={"/register"}
              className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
