import React, { useMemo } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCommentDollar, FaUser } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { MdOutlineUnpublished } from "react-icons/md";
import useAxios from "../../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const AdminDash = () => {
  const axiosSecure = useAxios();
  const { data: allBooks = [] } = useQuery({
    queryKey: ["allbooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
  const booksToShow = allBooks.slice(0, 4);
  const Unpublished = allBooks.filter((book) => book.publish === "Unpublished");
  const { data: order = [] } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axiosSecure.get("/carts");
      return res.data;
    },
  });
  const { data: allPayments = [] } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user`);
      return res.data;
    },
  });

  const totalRevenue = useMemo(() => {
    return allPayments
      .filter((p) => p.paymentStatus === "paid")
      .reduce((sum, p) => sum + p.price, 0);
  }, [allPayments]);
  return (
    <>
      <div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 my-3 gap-4 justify-center items-center">
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg  max-w-[300px]">
              <IoBookSharp className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {allBooks.length} Books
              </p>
            </div>
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg max-w-[300px]">
              <FaCartFlatbed className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {order.length} Orders{" "}
              </p>
            </div>
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg max-w-[300px]">
              <CiDeliveryTruck className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {allPayments.length} Delivered{" "}
              </p>
            </div>
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg max-w-[300px]">
              <FaCommentDollar className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {totalRevenue} Total Sale{" "}
              </p>
            </div>
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg max-w-[300px]">
              <MdOutlineUnpublished className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {Unpublished.length} Unpublished books{" "}
              </p>
            </div>
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg max-w-[300px]">
              <FaUser className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {users.length} users{" "}
              </p>
            </div>
          </div>
          <div>
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Seller Email</th>
                      <th>Price</th>
                      <th>Book Genre</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booksToShow.map((book) => (
                      <tr key={book._id}>
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
                      </tr>
                    ))}
                    {/* row 1 */}
                  </tbody>
                </table>
                <div className="text-center">
                  <Link
                    to={"/dashboard/manage-books"}
                    className="btn btn-xs text-center"
                  >
                    Show All books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
