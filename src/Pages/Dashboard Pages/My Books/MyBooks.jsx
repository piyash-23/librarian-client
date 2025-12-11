import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import BookCard from "../../../Utils/Books/BookCard";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyBooks = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { refetch, data: myBooks = [] } = useQuery({
    queryKey: ["myBooks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?email=${user.email}`);
      return res.data;
    },
  });
  const handleDelete = (book) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/books/${book}`).then((res) => {
          const data = res.data;
          if (data.message === "item deleted") {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  // console.log(myBooks);
  return (
    <>
      <div>
        <div>
          <h2 className="text-center font-extrabold text-4xl">
            You have {myBooks.length} books
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Book Title</th>
                <th>Seller Email</th>
                <th>Price</th>
                <th>Book Genre</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myBooks.map((book, i) => (
                <tr key={book._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={book.coverImage} alt={book.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{book.title}</div>
                        <div className="text-sm opacity-50">{book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td>{book.sellerEmail}</td>
                  <td>{book.price} taka</td>
                  <td>{book.category}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-ghost btn-md"
                    >
                      <AiFillDelete />
                    </button>
                    <Link
                      to={`/dashboard/update-book/${book._id}`}
                      className="btn btn-ghost btn-md"
                    >
                      <FaEdit />
                    </Link>
                  </th>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyBooks;
