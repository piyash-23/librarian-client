import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MdOutlineUnpublished } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyBooks = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const {
    isLoading,
    refetch,
    data: myBooks = [],
  } = useQuery({
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
  const handlePublish = (book) => {
    const updateInfo = {
      publish: "published",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to publish the book?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Publish",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/books/${book}`, updateInfo).then((res) => {
          const data = res.data;
          if (data.message === "book updated") {
            refetch();
            Swal.fire({
              title: "Published!",
              text: "Your book has been published.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleUnpublish = (book) => {
    const updateInfo = {
      publish: "Unpublished",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to unpublish the book?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unpublish",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/books/${book}`, updateInfo).then((res) => {
          const data = res.data;
          if (data.message === "book updated") {
            refetch();
            Swal.fire({
              title: "Unpublished!",
              text: "Your book has been unpublished.",
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
                <th>Status</th>
                <th>Stock</th>
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
                  <td>{book.publish}</td>
                  <td>{book.stock}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-ghost btn-md tooltip"
                      data-tip="Delete Book"
                    >
                      <AiFillDelete />
                    </button>
                    <Link
                      to={`/dashboard/update-book/${book._id}`}
                      className="btn btn-ghost btn-md tooltip"
                      data-tip="Edit Book"
                    >
                      <FaEdit />
                    </Link>
                    <button>
                      {book.publish === "Unpublished" ? (
                        <button
                          onClick={() => handlePublish(book._id)}
                          className="btn btn-xs bg-transparent border-none tooltip"
                          data-tip="Publish Book"
                        >
                          <MdOutlinePublishedWithChanges />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnpublish(book._id)}
                          className="btn btn-xs bg-transparent border-none tooltip"
                          data-tip="Unpublish Book"
                        >
                          <MdOutlineUnpublished />
                        </button>
                      )}
                    </button>
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
