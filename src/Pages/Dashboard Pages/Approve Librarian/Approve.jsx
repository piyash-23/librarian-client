import React from "react";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaUserCheck, FaUserMinus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const Approve = () => {
  const axiosSecure = useAxios();
  const { refetch, data: librarian = [] } = useQuery({
    queryKey: ["librarian", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/librarian");
      return res.data;
    },
  });

  const updateLibInfo = (librarian, status) => {
    const updateInfo = { status: status, email: librarian.email };
    axiosSecure.patch(`/librarian/${librarian._id}`, updateInfo).then((res) => {
      const data = res.data;
      if (data.message === "updated") {
        Swal.fire({
          title: "Updated",
          icon: "success",
          draggable: true,
        });
        refetch();
      }
    });
  };

  const handleApprove = (id) => {
    updateLibInfo(id, "approved");
  };
  const handleReject = (id) => {
    updateLibInfo(id, "rejected");
  };
  const handleDelete = (id) => {
    axiosSecure.delete(`/librarian/${id}`).then((res) => {
      const data = res.data;
      if (data.message === "deleted") {
        Swal.fire({
          title: "Deleted Successfully",
          icon: "success",
          draggable: true,
        });
        refetch();
      }
    });
  };

  return (
    <>
      <div>
        <div>
          <h2 className="text-4xl text-center font-extrabold my-4">
            Pending approvals: {librarian.length}
          </h2>
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {librarian.map((lib, i) => (
                    <tr key={lib._id}>
                      <th>{i + 1}</th>
                      <td>{lib.name}</td>
                      <td>{lib.email}</td>
                      <td
                        className={`${
                          lib.status === "approved"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {lib.status}
                      </td>
                      <td>
                        <button
                          onClick={() => handleApprove(lib)}
                          className="btn"
                        >
                          <FaUserCheck />
                        </button>
                        <button
                          onClick={() => handleReject(lib)}
                          className="btn"
                        >
                          <FaUserMinus />
                        </button>
                        <button
                          onClick={() => handleDelete(lib._id)}
                          className="btn"
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

export default Approve;
