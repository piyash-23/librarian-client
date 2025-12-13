import React from "react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { title, author, category, price, coverImage, shortDescription, _id } =
    book;
  return (
    <>
      <Link to={`/book-details/${_id}`} className="mt-7">
        <div className="flex justify-center items-center p-2 bg-blue-500 rounded-2xl">
          <div className="max-w-4xl w-full mx-auto bg-primary rounded-xl shadow-2xl overflow-hidden md:flex">
            {/* Left Side: Image and Tag */}
            <div className="md:w-1/2 p-4 flex flex-col justify-between">
              <span className="text-sm font-semibold  mb-2 py-1 px-3 text-secondary bg-gray-400 rounded-full w-fit">
                #{category}
              </span>
              <div className="aspect-w-1 aspect-h-1">
                <img
                  className="aspect-3/2 object-cover rounded-lg"
                  src={coverImage}
                  alt="Close-up view of the Moon's surface"
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4 leading-tight">
                  {title}
                </h2>
                <p className="text-gray-600 mb-6 text-base">
                  {shortDescription.length === 30
                    ? shortDescription.slice(0, 29)
                    : shortDescription}
                </p>
                <span className="text-sm font-semibold  mb-2 py-1 px-3 bg-gray-400 text-secondary rounded-full w-fit">
                  {price} taka
                </span>
              </div>

              {/* Author and Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div>
                    <p className="text-sm font-medium text-secondary">
                      By **{author}**
                    </p>
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex space-x-2">
                  <button
                    aria-label="More options"
                    className="p-2 text-gray-600 hover:text-gray-800 rounded-full transition duration-150"
                  >
                    {/* A simplified SVG for the three dots icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
