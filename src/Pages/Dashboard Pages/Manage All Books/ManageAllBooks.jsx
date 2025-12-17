import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageAllBooks = () => {
  const axiosSecure = useAxios();
  const {
    isLoading,
    refetch,
    data: allBooks = [],
  } = useQuery({
    queryKey: ["manage-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
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
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4 w-60">
          <div>
            <div className="w-48 h-6 bg-slate-400 rounded-md" />
            <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md" />
          </div>
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-1/2 rounded-md" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div>
        <div>
          <h1>Manage All Books Here</h1>
        </div>
        <div>
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
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allBooks.map((book, i) => (
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
                          <div className="text-sm opacity-50">
                            {book.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{book.sellerEmail}</td>
                    <td>{book.price} taka</td>
                    <td>{book.category}</td>
                    <td>{book.stock}</td>
                    <th>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="btn btn-ghost btn-md tooltip"
                        data-tip="Delete Book"
                      >
                        <AiFillDelete />
                      </button>
                    </th>
                  </tr>
                ))}
                {/* row 1 */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAllBooks;
