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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const LibrarianDash = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();

  const { data: myBooks = [] } = useQuery({
    queryKey: ["myBooks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?email=${user.email}`);
      return res.data;
    },
  });

  const Unpublished = myBooks.filter((book) => book.publish === "Unpublished");

  const { data: order = [] } = useQuery({
    queryKey: ["order", user?.email],
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

  // 📊 Chart Data
  const chartData = [
    { name: "Books", value: myBooks.length },
    { name: "Orders", value: order.length },
    { name: "Delivered", value: myPayments.length },
    { name: "Unpublished", value: Unpublished.length },
  ];
  const pieData = [{ name: "Revenue", value: totalRevenue }];

  return (
    <div className="px-3">
      <div className="w-full md:w-9/12 mx-auto">
        {/* 🔹 MOBILE: Cards */}
        <div className="grid grid-cols-2 gap-4 my-4 md:hidden">
          <Card icon={<IoBookSharp />} value={myBooks.length} label="Books" />
          <Card icon={<FaCartFlatbed />} value={order.length} label="Orders" />
          <Card
            icon={<CiDeliveryTruck />}
            value={myPayments.length}
            label="Delivered"
          />
          <Card
            icon={<FaCommentDollar />}
            value={totalRevenue}
            label="Total Sale"
          />
          <Card
            icon={<MdOutlineUnpublished />}
            value={Unpublished.length}
            label="Unpublished"
          />
        </div>

        {/* 🔹 DESKTOP: Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 py-5">
          <div className="hidden md:block bg-slate-800 p-5 rounded-xl my-5">
            <h2 className="text-lg font-semibold text-white mb-4">
              Overview Statistics
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.name === "Revenue" ? "#22c55e" : "#38bdf8"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-slate-800 p-5 rounded-xl flex flex-col items-center">
            <h2 className="text-lg font-semibold text-white mb-4">
              Total Revenue
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  fill="#22c55e"
                  label
                >
                  <Cell fill="#22c55e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <p className="text-green-400 font-bold text-xl mt-3">
              ${totalRevenue}
            </p>
          </div>
        </div>
        {/* 🔹 Transaction History */}
        <div className="bg-slate-800 text-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
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
              <thead>
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
                  <tr key={item._id} className="border-b">
                    <td className="py-3">{item.bookTitle}</td>
                    <td className="py-3">{item.price}</td>
                    <td className="py-3">{item.paymentStatus}</td>
                    <td className="py-3">{item.transactionId}</td>
                    <td className="py-3 text-right">{item.buyerEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-4 md:hidden">
            {trToShow.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>{item.bookTitle}</span>
                  <span>{item.paymentStatus}</span>
                </div>
                <p className="text-sm">{item.buyerEmail}</p>
                <p className="text-xs">{item.transactionId}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, value, label }) => (
  <div className="bg-slate-800 text-white p-4 rounded-lg">
    <div className="text-5xl text-gray-400">{icon}</div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm">{label}</p>
  </div>
);

export default LibrarianDash;
