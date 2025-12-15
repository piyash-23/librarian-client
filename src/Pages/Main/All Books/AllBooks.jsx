import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import BookCard from "../../../Utils/Books/BookCard";

const AllBooks = () => {
  const axiosSecure = useAxios();
  const { data: allBooks = [] } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
  const publishedBooks = allBooks.filter(
    (books) => books.publish === "published"
  );
  const [searched, setSearched] = useState("");
  const [sort, setSort] = useState("");
  const handleSearch = (e) => {
    setSearched(e.target.value);
  };
  const handleSort = (type) => {
    setSort(type);
  };
  const filteredBooks = useMemo(() => {
    let books = publishedBooks.filter((book) =>
      book.title.toLowerCase().includes(searched.toLowerCase())
    );

    if (sort === "High") {
      books = [...books].sort((a, b) => b.price - a.price);
    }

    if (sort === "Low") {
      books = [...books].sort((a, b) => a.price - b.price);
    }

    return books;
  }, [searched, sort, publishedBooks]);

  //   console.log(allBooks);
  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <input
              className="border px-2 py-3"
              type="text"
              placeholder="Search Here"
              onChange={handleSearch}
            />
          </div>
          <div>
            <button
              className="btn border-none"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" }}
            >
              Sort By
            </button>

            <ul
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
              popover="auto"
              id="popover-1"
              style={{ positionAnchor: "--anchor-1" }}
            >
              <li>
                <a>
                  <button onClick={() => handleSort("High")}>
                    Price- High To Low
                  </button>
                </a>
              </li>
              <li>
                <a>
                  <button onClick={() => handleSort("Low")}>
                    Price- Low To High
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-90 md:w-[100%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book}></BookCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBooks;
