import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyCart = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const {
    isLoading,
    refetch,
    data: myCart = [],
  } = useQuery({
    queryKey: ["myCart", "price"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?buyerEmail=${user.email}`);
      return res.data;
    },
  });
  const handlePayment = async (book) => {
    const paymentInfo = {
      bookId: book._id,
      sellerEmail: book.sellerEmail,
      buyerEmail: user.email,
      title: book.title,
      price: book.price,
    };
    // console.log(paymentInfo);
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    // console.log(res.data.url);
    window.location.href = res.data.url;
  };
  const deleteCart = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
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
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Payment Status</th>
                    <th>Order Status</th>
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
                      <td>{cart.sellerEmail}</td>
                      <td>{cart.price} taka</td>
                      <td>
                        {cart.paymentStatus === "unpaid" ? (
                          <button
                            onClick={() => handlePayment(cart)}
                            className="btn bg-yellow-300 btn-xs text-black"
                          >
                            Pay Now
                          </button>
                        ) : (
                          <p className="text-white bg-green-600 px-2 py-1 inline-block rounded-md">
                            Paid
                          </p>
                        )}
                      </td>
                      <td>{cart.orderStatus}</td>
                      <td>
                        <button
                          onClick={() => deleteCart(cart._id)}
                          className="btn btn-xs"
                        >
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
