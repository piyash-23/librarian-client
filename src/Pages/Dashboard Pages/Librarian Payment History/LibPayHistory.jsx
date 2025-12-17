import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";

const LibPayHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { isLoading, data: myPayments = [] } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?sellerEmail=${user?.email}`);
      return res.data;
    },
  });
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
          <div>
            <h2 className="text-3xl my-3 font-extrabold">
              You have {myPayments.length} payments
            </h2>
          </div>
          <div className="my-3">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Book</th>
                    <th>Buyer Email</th>
                    <th>Transaction ID</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {myPayments.map((payment, i) => (
                    <tr key={payment._id}>
                      <th>{i + 1}</th>
                      <td>{payment.bookTitle}</td>
                      <td>{payment.buyerEmail}</td>
                      <td>{payment.transactionId} </td>
                      <td>Paid {payment.price} taka</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibPayHistory;
