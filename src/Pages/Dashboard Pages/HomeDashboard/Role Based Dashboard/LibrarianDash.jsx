import React, { useMemo } from "react";
import UseAuth from "../../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IoBookSharp } from "react-icons/io5";
import { FaCartFlatbed } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuSquareArrowUpRight } from "react-icons/lu";
import { Link } from "react-router";
import { FaCommentDollar } from "react-icons/fa";
import { MdOutlineUnpublished } from "react-icons/md";

const LibrarianDash = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { data: myBooks = [] } = useQuery({
    queryKey: ["myBooks", user?.emial],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?email=${user.email}`);
      return res.data;
    },
  });
  const Unpublished = myBooks.filter((book) => book.publish === "Unpublished");
  const { data: order = [] } = useQuery({
    queryKey: ["order", user?.emial],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?sellerEmail=${user?.email}`);
      return res.data;
    },
  });
  const { data: myPayments = [] } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?sellerEmail=${user?.email}`);
      return res.data;
    },
  });
  const totalRevenue = useMemo(() => {
    return myPayments
      .filter((p) => p.paymentStatus === "paid")
      .reduce((sum, p) => sum + p.price, 0);
  }, [myPayments]);
  const trToShow = myPayments.slice(0, 4);
  return (
    <>
      <div className="px-3">
        <div className="w-full md:w-9/12">
          <div className="grid grid-cols-2 md:grid-cols-3 my-3 gap-4 justify-center items-center">
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg  max-w-[300px]">
              <IoBookSharp className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {myBooks.length} Books
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
                {myPayments.length} Delivered{" "}
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
          </div>
          {/* transaction history */}
          <div>
            <div className="bg-slate-800 text-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold mb-4">
                  Transaction History
                </h2>
                <Link
                  to={"/dashboard/lib-payments"}
                  className="p-2 tooltip"
                  data-tip="Browse Payments"
                >
                  <LuSquareArrowUpRight className="text-2xl" />
                </Link>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-200">
                    <tr className="border-b">
                      <th className="text-left py-3">Book</th>
                      <th className="text-left py-3">Price</th>
                      <th className="text-left py-3">Payment</th>
                      <th className="text-left py-3">Transaction</th>
                      <th className="text-right py-3">Buyer</th>
                    </tr>
                  </thead>

                  <tbody>
                    {trToShow.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b last:border-none hover:bg-gray-50 hover:text-black transition"
                      >
                        <td className="py-4 font-medium">{item.bookTitle}</td>
                        <td className="py-4">{item.price}</td>
                        <td className="py-4">{item.paymentStatus}</td>
                        <td className="py-4">
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                            {item.transactionId}
                          </span>
                        </td>
                        <td className="py-4 text-right font-semibold">
                          {item.buyerEmail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="space-y-4 md:hidden">
                {trToShow.map((item) => (
                  <div
                    key={item._id}
                    className="border rounded-lg p-4 flex flex-col gap-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{item.bookTitle}</span>
                      <span className="font-semibold">
                        {item.paymentStatus}
                      </span>
                    </div>

                    <div className="text-sm text-gray-200">
                      {item.buyerEmail}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs">{item.transactionId}</span>
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibrarianDash;
