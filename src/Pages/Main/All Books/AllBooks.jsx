import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import BookCard from "../../../Utils/Books/BookCard";

const AllBooks = () => {
  const axiosSecure = useAxios();
  const { refetch, data: allBooks = [] } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
  //   console.log(allBooks);
  return (
    <>
      <div>
        <div className="w-90 md:w-[100%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allBooks.map((book) => (
              <BookCard key={book._id} book={book}></BookCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBooks;
