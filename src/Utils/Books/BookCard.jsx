import React from "react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { title, author, category, price, coverImage, shortDescription, _id } =
    book;
  return (
    <>
      <Link to={`/book-details/${_id}`} className="mt-7">
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
            <img
              src={coverImage}
              alt={title}
              className="aspect-3/3 mx-auto my-auto"
            />
          </div>
          <div className="p-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {title}
            </h5>
            <div className="flex justify-between">
              <h2>{author}</h2>
              <h3>{category}</h3>
            </div>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              {shortDescription}
            </p>
            <div className="flex justify-between">
              <h2>{price} taka</h2>
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
              data-ripple-light="true"
              type="button"
              className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:shadow-none active:opacity-[0.85] active:shadow-none cursor-pointer "
            >
              Read More
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
