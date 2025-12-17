import React from "react";
import Lottie from "lottie-react";
import noResultsAnimation from "../../assets/noResults.json";

const NoResults = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Lottie Animation */}
        <div className="w-64 sm:w-72 md:w-80">
          <Lottie
            animationData={noResultsAnimation}
            loop={true}
            autoplay={true}
          />
        </div>

        {/* Text */}
        <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-indigo-600">
          No Books found
        </h2>

        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          We couldn't find what you searched for. <br />
          Try searching again.
        </p>

        {/* Optional Button */}
        <button
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-2 text-white
                     hover:bg-indigo-700 transition duration-300"
        >
          Search Again
        </button>
      </div>
    </div>
  );
};

export default NoResults;
