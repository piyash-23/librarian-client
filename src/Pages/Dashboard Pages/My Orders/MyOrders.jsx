import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";

const MyOrders = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { refetch, data: myOrders = [] } = useQuery({
    queryKey: ["myOrderes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?sellerEmail=${user?.email}`);
      return res.data;
    },
  });
  return (
    <>
      <div>
        <div>
          <h2 className="text-3xl font-extrabold">
            You have {myOrders.length} order in list
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Buyer</th>
                  <th>Price</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order, i) => (
                  <tr key={order._id}>
                    <th>{i + 1}</th>
                    <td>{order.title}</td>
                    <td>{order.buyerEmail}</td>
                    <td>{order.price} taka</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.orderStatus}</td>
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

export default MyOrders;
