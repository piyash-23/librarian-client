import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* 4 */}
            <div className="relative">
              <span className="text-8xl sm:text-[180px] md:text-[220px] font-bold text-purple-200">
                4
              </span>
              <div className="absolute top-4 left-2 sm:top-8 sm:left-4 w-4 h-8 sm:w-6 sm:h-12 bg-purple-300 opacity-50"></div>
              <div className="absolute bottom-12 right-2 sm:bottom-20 sm:right-4 w-6 h-4 sm:w-10 sm:h-6 bg-purple-300 opacity-50"></div>
            </div>

            <div className="relative">
              <span className="text-8xl sm:text-[180px] md:text-[220px] font-bold text-purple-200">
                0
              </span>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-24 sm:w-24 sm:h-36 md:w-28 md:h-40 bg-white rounded-t-full border-4 border-purple-400 shadow-lg">
                <div className="absolute top-1/2 right-3 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></div>

                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-300 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="relative">
              <span className="text-8xl sm:text-[180px] md:text-[220px] font-bold text-purple-200">
                3
              </span>
              <div className="absolute top-8 right-2 sm:top-16 sm:right-4 w-8 h-4 sm:w-12 sm:h-6 bg-purple-300 opacity-50"></div>
              <div className="absolute bottom-8 left-2 sm:bottom-16 sm:left-4 w-4 h-6 sm:w-6 sm:h-10 bg-purple-300 opacity-50"></div>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-2 border-purple-300 opacity-50"></div>
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-6 h-6 sm:w-10 sm:h-10 border-2 border-purple-300 opacity-50"></div>
          <div className="absolute bottom-0 right-12 sm:right-20 w-4 h-12 sm:w-6 sm:h-16 border-2 border-purple-300 opacity-50"></div>
          <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-16 w-10 h-4 sm:w-16 sm:h-6 border-2 border-purple-300 opacity-50"></div>
        </div>

        <div className="space-y-4 sm:space-y-6 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-800">
            You're not permitted to see this.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            The page you're trying to access has restricted access.
          </p>

          <p className="text-sm sm:text-base text-gray-500">
            If you feel this is a mistake, contact your admin.
          </p>

          <div className="pt-4 sm:pt-6">
            <Link
              to={"/dashboard"}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-sm sm:text-base transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
            >
              RETURN HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
