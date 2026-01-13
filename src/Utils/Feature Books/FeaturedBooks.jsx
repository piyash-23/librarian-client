import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hooks/UseAxios/useAxios";
import BookCard from "../Books/BookCard";
import { Link } from "react-router";
import FallbackEm from "../../Components/Fallback/FallbackEm";

const FeaturedBooks = () => {
  const axiosSecure = useAxios();
  const { isLoading, data: featured = [] } = useQuery({
    queryKey: ["feature"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
  const toFeature = featured
    .filter((books) => books.publish === "published")
    .slice(0, 8);
  if (isLoading) {
    return <FallbackEm />;
  }
  return (
    <>
      <div>
        <div>
          <h2 className="text-4xl text-center my-6 font-extrabold">
            Our latest book by publishers
          </h2>
          <div className="w-96 md:w-[100%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {toFeature.map((book) => (
                <BookCard key={book._id} book={book}></BookCard>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <Link to={"/all-books"}>
              <button className="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md mx-auto">
                All Books
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedBooks;
