import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";

const LibPayHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { data: myPayments = [] } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?sellerEmail=${user?.email}`);
      return res.data;
    },
  });
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
