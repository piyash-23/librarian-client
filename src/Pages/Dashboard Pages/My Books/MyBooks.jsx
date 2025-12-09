import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import BookCard from "../../../Utils/Books/BookCard";

const MyBooks = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { data: myBooks = [] } = useQuery({
    queryKey: ["myBooks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?email=${user.email}`);
      return res.data;
    },
  });
  console.log(myBooks);
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 ml-3">
          {myBooks.map((book) => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBooks;
