import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashCan } from "react-icons/fa6";

const MyCart = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { refetch, data: myCart = [] } = useQuery({
    queryKey: ["myCart", "price"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <>
      <div>
        <div>
          <h1>You have {myCart.length} books in your cart</h1>
          <div className="my-6">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {myCart.map((cart, i) => (
                    <tr key={cart._id}>
                      <th>{i + 1}</th>
                      <td>{cart.title}</td>
                      <td>{cart.author}</td>
                      <td>{cart.price} taka</td>
                      <td>
                        {cart.paymentStatus === "unpaid" ? (
                          <button className="btn bg-yellow-300 btn-xs text-black">
                            Pay Now
                          </button>
                        ) : (
                          <p className="text-black bg-green-600 px-2 py-1">
                            paid
                          </p>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-xs">
                          <FaRegTrashCan />
                        </button>
                      </td>
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

export default MyCart;
