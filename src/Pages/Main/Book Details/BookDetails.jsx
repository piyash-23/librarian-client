import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { BsArrowRight } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { BiDownload, BiShare } from "react-icons/bi";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { data: bookData = {} } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });
  const { coverImage, title, description, price, author, language, binding } =
    bookData;
  console.log(bookData);
  return (
    <>
      <div>
        <div className=" p-4 md:p-8 lg:p-12">
          <div className=" mx-auto rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10 lg:p-12">
              {/* Left Column - Book Cover */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-64 md:w-80 shadow-2xl rounded-sm"
                  />
                </div>
              </div>

              {/* Right Column - Book Details */}
              <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-2">
                  {title}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-6">
                  {author}
                </p>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Get ready to uncover the dark secrets and betrayals in the
                  book. A thrilling adventure awaits you.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <button className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
                    Add to cart
                    <BsArrowRight size={18} />
                  </button>
                  <button className="border border-gray-300 p-3 rounded-full hover:bg-gray-100 transition-colors hover:text-black">
                    <LuBookMarked size={20} />
                  </button>
                  <button className="border border-gray-300 p-3 rounded-full hover:bg-gray-100 transition-colors hover:text-black">
                    <BiShare size={20} />
                  </button>
                  <button className="border border-gray-300 p-3 rounded-full hover:bg-gray-100 transition-colors hover:text-black">
                    <BiDownload size={20} />
                  </button>
                </div>

                {/* Description Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                </div>

                {/* Review Section */}

                {/* Additional Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Editors</h3>
                    <p className="text-sm text-gray-700">{author}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Language</h3>
                    <p className="text-sm text-gray-700">{language}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="font-semibold mb-2">Binding</h3>
                    <p className="text-sm text-gray-700">{binding}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
