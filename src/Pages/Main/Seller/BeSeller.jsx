import React, { useState } from "react";
import graph from "../../../assets/graph.png";
import { FcDataSheet } from "react-icons/fc";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { BiSolidCoinStack } from "react-icons/bi";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const BeSeller = () => {
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const afterSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="my-6">
        <div>
          {/* hero section */}
          <div className="flex justify-around items-center bg-blue-400 rounded-4xl p-5 flex-wrap md:flex-nowrap gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 text-primary">
                Sell your books in efficient way
              </h1>
              <p className="text-primary">Register as a seller now</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div className="bg-secondary p-2 rounded-lg text-center">
                  <FcDataSheet className="text-5xl mx-auto my-2" />
                  <p>Global Reach</p>
                </div>
                <div className="bg-secondary p-2 rounded-lg text-center">
                  <FaEnvelopeOpenText className="text-5xl mx-auto my-2" />
                  <p> Easy Setup</p>
                </div>
                <div className="bg-secondary p-2 rounded-lg text-center">
                  <FaMagnifyingGlassChart className="text-5xl mx-auto my-2" />
                  <p>Analysis</p>
                </div>
                <div className="bg-secondary p-2 rounded-lg text-center">
                  <BiSolidCoinStack className="text-5xl mx-auto my-2" />
                  <p>Secure Payments</p>
                </div>
              </div>
            </div>
            <div>
              <img className="w-[400px] hidden md:block" src={graph} alt="" />
            </div>
          </div>
          <div className="my-5 w-[90%] md:w-[100%] mx-auto">
            {/* left */}
            <div className="flex-1">
              <div className=" flex items-center justify-center p-4">
                <div className="w-full  bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
                  {/* LEFT SIDE - info panel */}
                  <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-10 text-white relative flex flex-col justify-center">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-blue-600 rounded-full opacity-20 -translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400 rounded-full opacity-30 translate-x-10 translate-y-10"></div>

                    <h2 className="text-3xl font-bold mb-2 relative z-10">
                      Register As a Seller
                    </h2>
                    <p className="text-sm mb-8 opacity-90 relative z-10">
                      Create a seller account to unlock selling features
                    </p>
                  </div>

                  {/* RIGHT SIDE — SIGNUP FORM */}
                  <div className="w-full md:w-1/2 p-10 flex flex-col justify-center relative z-10 text-black">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                      Librarian Register
                    </h2>

                    <form
                      onSubmit={handleSubmit(afterSubmit)}
                      className="space-y-4"
                    >
                      {/* FULL NAME */}
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          defaultValue={user?.displayName}
                          className="w-full px-4 py-3 focus:outline-none border-b"
                          {...register("name", {
                            required: "Full name is required",
                          })}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* EMAIL */}
                      <div>
                        <input
                          type="email"
                          placeholder="Email"
                          defaultValue={user?.email}
                          className="w-full px-4 py-3 focus:outline-none border-b"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /.+@.+\..+/,
                              message: "Invalid email format",
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* PHONE */}
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full px-4 py-3 focus:outline-none border-b"
                          {...register("phone", {
                            required: "Phone number is required",
                            minLength: { value: 11, message: "Too short" },
                          })}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      {/* PASSWORD */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="NID Number"
                          className="w-full px-4 py-3 focus:outline-none border-b"
                          {...register("nid", {
                            required: "nid is required",
                          })}
                        />
                        {errors.nid && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.nid.message}
                          </p>
                        )}
                      </div>
                      {/* business */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Business name"
                          className="w-full px-4 py-3 focus:outline-none border-b"
                          {...register("business")}
                        />
                      </div>
                      {/* SUBMIT BUTTON */}
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg cursor-pointer"
                      >
                        Register as a seller
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* right side */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BeSeller;
