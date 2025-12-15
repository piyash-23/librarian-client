import React, { useMemo } from "react";
import UseAuth from "../../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaCartArrowDown } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { HiCurrencyBangladeshi } from "react-icons/hi";

const UserDash = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { data: myCart = [] } = useQuery({
    queryKey: ["myCart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?buyerEmail=${user.email}`);
      return res.data;
    },
  });

  const { data: myPayments = [] } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?buyerEmail=${user?.email}`);
      return res.data;
    },
  });
  const totalRevenue = useMemo(() => {
    const total = myPayments
      .filter((p) => p.paymentStatus === "paid")
      .reduce((sum, p) => sum + p.price, 0);
    return total;
  }, [myPayments]);
  return (
    <>
      <div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 my-3 gap-4 justify-center items-center">
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg  max-w-[300px]">
              <FaCartArrowDown className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {myCart.length} Books in cart
              </p>
            </div>
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg max-w-[300px]">
              <CiDeliveryTruck className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {myPayments.length} Orders Completed{" "}
              </p>
            </div>
            <div className="bg-slate-800 text-white px-3 py-4 rounded-lg max-w-[300px]">
              <HiCurrencyBangladeshi className="text-7xl text-[gray]" />
              <p className="font-bold text-3xl md:text-4xl">
                {totalRevenue} Paid{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDash;
