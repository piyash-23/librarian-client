import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hooks/UseAxios/useAxios";
import BookCard from "../Books/BookCard";
import { Link } from "react-router";

const FeaturedBooks = () => {
  const axiosSecure = useAxios();
  const { data: featured = [] } = useQuery({
    queryKey: ["feature"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
  const toFeature = featured.slice(0, 8);
  return (
    <>
      <div>
        <div>
          <h2 className="text-4xl text-center my-6 font-extrabold">
            Our latest book by publishers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {toFeature.map((book) => (
              <BookCard key={book._id} book={book}></BookCard>
            ))}
          </div>
          <div>
            <Link to={"/all-books"}>
              <button className="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24px"
                  width="24px"
                >
                  <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    id="SVGRepo_tracerCarrier"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Interface / Download">
                      {" "}
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth={2}
                        stroke="#f1f1f1"
                        d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                        id="Vector"
                      />{" "}
                    </g>{" "}
                  </g>
                </svg>
                Download
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedBooks;
