import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaShippingFast, FaTruckLoading } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const {
    isLoading,
    refetch,
    data: myOrders = [],
  } = useQuery({
    queryKey: ["myOrderes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?sellerEmail=${user?.email}`);
      return res.data;
    },
  });
  const handleShipped = (order) => {
    const updateInfo = {
      orderStatus: "shipped",
    };
    axiosSecure
      .patch(`/carts/${order}`, updateInfo)
      .then((res) => {
        const data = res.data;
        if (data.message === "shipped") {
          Swal.fire({
            title: "Shipped",
            icon: "success",
            draggable: true,
          });
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelivered = (order) => {
    const updateInfo = {
      orderStatus: "Delivered",
    };
    axiosSecure
      .patch(`/carts/${order}`, updateInfo)
      .then((res) => {
        const data = res.data;
        if (data.message === "shipped") {
          Swal.fire({
            title: "Delivered",
            icon: "success",
            draggable: true,
          });
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cartDelete = (order) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${order}`).then((res) => {
          const data = res.data;
          if (data.message === "deleted cart") {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your cart has been deleted.",
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
                    <td>
                      <h2
                        className={`${
                          order.paymentStatus === "paid"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } px-3 py-2 inline-block rounded-lg font-bold text-white text-xs`}
                      >
                        {order.paymentStatus}
                      </h2>
                    </td>
                    <td>
                      <h2
                        className={`${
                          order.orderStatus === "shipped"
                            ? "bg-green-600"
                            : "bg-red-600"
                        } ${
                          order.orderStatus === "Delivered" && "bg-yellow-400"
                        } font-bold px-3 py-2 inline-block rounded-lg text-white text-xs`}
                      >
                        {order.orderStatus}
                      </h2>
                    </td>
                    <td>
                      <button
                        onClick={() => handleShipped(order._id)}
                        className="btn btn-xs mx-1.5 tooltip"
                        data-tip="Approve Shipment"
                      >
                        <FaShippingFast />
                      </button>
                      <button
                        onClick={() => cartDelete(order._id)}
                        disabled={order.paymentStatus === "paid" ? true : false}
                        className="btn btn-xs tooltip mx-1.5"
                        data-tip="delete-order"
                      >
                        <FaRegTrashCan />
                      </button>
                      <button
                        onClick={() => handleDelivered(order._id)}
                        disabled={order.paymentStatus === "paid" ? false : true}
                        className="btn btn-xs tooltip"
                        data-tip="Delivered"
                      >
                        <FaTruckLoading />
                      </button>
                    </td>
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
