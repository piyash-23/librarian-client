import React, { useMemo } from "react";

import useAxios from "../../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
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
  Legend,
  LineChart,
  Line,
} from "recharts";
const COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#f97316"];
const AdminDash = () => {
  const axiosSecure = useAxios();
  const { data: allBooks = [] } = useQuery({
    queryKey: ["allbooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
  const booksToShow = allBooks.slice(0, 4);
  const Unpublished = allBooks.filter((book) => book.publish === "Unpublished");
  const { data: order = [] } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axiosSecure.get("/carts");
      return res.data;
    },
  });
  const { data: allPayments = [] } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user`);
      return res.data;
    },
  });

  const totalRevenue = useMemo(() => {
    return allPayments
      .filter((p) => p.paymentStatus === "paid")
      .reduce((sum, p) => sum + p.price, 0);
  }, [allPayments]);

  // 1️⃣ Books by Category (Bar)
  const bookCategoryData = useMemo(() => {
    const map = {};

    allBooks.forEach((b) => {
      const category = b.category || "Unknown";
      map[category] = (map[category] || 0) + 1;
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  }, [allBooks]);

  // 2️⃣ Order vs Delivered (Bar)
  const orderData = [
    { name: "Orders", value: order.length },
    { name: "Delivered", value: allPayments.length },
  ];

  // 3️⃣ Revenue Line Chart
  const revenueData = useMemo(() => {
    return allPayments
      .filter((p) => p.paymentStatus === "paid")
      .map((p, index) => ({
        name: `Order ${index + 1}`,
        revenue: p.price,
      }));
  }, [allPayments]);

  // 4️⃣ Published vs Unpublished (Pie)
  const publishData = useMemo(() => {
    const unpublished = allBooks.filter(
      (b) => b.publish === "Unpublished"
    ).length;
    const published = allBooks.length - unpublished;

    return [
      { name: "Published", value: published },
      { name: "Unpublished", value: unpublished },
    ];
  }, [allBooks]);

  // 5️⃣ User Chart (Pie)
  const userData = [{ name: "Users", value: users.length }];

  return (
    <>
      <div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Books by Category */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Books by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookCategoryData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Orders vs Delivered */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Orders & Delivered</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Line Chart */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Revenue Flow</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Published vs Unpublished */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Publish Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={publishData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {publishData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Users Pie */}
            <div className="bg-white p-5 rounded-lg shadow md:col-span-2">
              <h2 className="text-lg font-bold mb-4">Total Users</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={userData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    fill="#6366f1"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Seller Email</th>
                      <th>Price</th>
                      <th>Book Genre</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booksToShow.map((book) => (
                      <tr key={book._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img src={book.coverImage} alt={book.title} />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{book.title}</div>
                              <div className="text-sm opacity-50">
                                {book.author}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{book.sellerEmail}</td>
                        <td>{book.price} taka</td>
                        <td>{book.category}</td>
                        <td>{book.stock}</td>
                      </tr>
                    ))}
                    {/* row 1 */}
                  </tbody>
                </table>
                <div className="text-center">
                  <Link
                    to={"/dashboard/manage-books"}
                    className="btn btn-xs text-center"
                  >
                    Show All books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
