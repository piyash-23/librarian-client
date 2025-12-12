import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";

const UserPayHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { data: myPayments = [] } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?buyerEmail=${user?.email}`);
      return res.data;
    },
  });
  return (
    <>
      <div>
        <div>
          <h2 className="text-3xl font-extrabold text-center my-4">
            Yout Payment History
          </h2>
        </div>
        <div className="my-4">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Paid Amount</th>
                  <th>Transaction ID</th>
                  <th>Payment Status</th>
                  <th>Book Seller</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {myPayments.map((payment, i) => (
                  <tr key={payment._id}>
                    <th>{i + 1}</th>
                    <td>{payment.bookTitle}</td>
                    <td>{payment.price}</td>
                    <td>{payment.transactionId}</td>
                    <td>
                      <h2 className="px-3 py-2 inline-block rounded-lg font-bold text-white bg-green-500">
                        {payment.paymentStatus}
                      </h2>
                    </td>
                    <td>{payment.sellerEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPayHistory;
