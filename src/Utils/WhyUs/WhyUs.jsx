import React from "react";
import packaging from "../../assets/packge.jpg";
import homeDel from "../../assets/homeDel.jpg";
import bookread from "../../assets/bookread.jpg";
import { BiCheckCircle } from "react-icons/bi";

const WhyUs = () => {
  return (
    <>
      <div className="min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Images Section */}
            <div className="space-y-6">
              {/* Battle Ropes Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-gray-800 rounded-3xl overflow-hidden">
                  <img
                    src={packaging}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
              </div>

              {/* Gym Interior Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl transform -rotate-2"></div>
                <div className="relative bg-gray-800 rounded-3xl overflow-hidden">
                  <img
                    src={homeDel}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
              </div>

              {/* Running Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-3xl transform rotate-2"></div>
                <div className="relative bg-gray-800 rounded-3xl overflow-hidden">
                  <img
                    src={bookread}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Why Choose Librarian?
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">
                  Our team is always here to help you with orders, queries, and
                  reading tips.
                </p>
              </div>

              <div className="space-y-6">
                {/* Expert Trainers */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <BiCheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                      Eco-Friendly Packaging
                    </h3>
                    <p className="text-gray-400">
                      We care about the planet as much as we care about books.
                    </p>
                  </div>
                </div>

                {/* State-of-the-Art Equipment */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <BiCheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                      Fast & Seamless Experience
                    </h3>
                    <p className="text-gray-400">
                      Built with modern MERN technology for smooth browsing,
                      secure checkout, and quick loading.
                    </p>
                  </div>
                </div>

                {/* Comprehensive Programs */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <BiCheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                      Trusted by Readers
                    </h3>
                    <p className="text-gray-400">
                      Thousands of satisfied readers rely on us for quality
                      books and great service.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold border-4 border-white group cursor-pointer"
                >
                  <div className="bg-green-400 rounded-xl h-12 w-1/4 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500">
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#000000"
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                      />
                      <path
                        fill="#000000"
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                      />
                    </svg>
                  </div>
                  <p className="translate-x-4">Shop Books</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyUs;
