import React from "react";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FaUserLargeSlash } from "react-icons/fa6";
import Swal from "sweetalert2";

const ManageUser = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });
  const handleMakeAdmin = (data) => {
    const updateInfo = { role: "admin" };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You want to make ${user?.displayName} admin?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/user/${data._id}/role`, updateInfo)
            .then((res) => {
              const data = res.data;
              if (data.message === "updated") {
                refetch();
                swalWithBootstrapButtons.fire({
                  title: "Made",
                  text: `${user.displayName} is an admin now`,
                  icon: "success",
                });
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: `${user?.displayName} is still the same`,
            icon: "error",
          });
        }
      });
  };
  const handleRemoveAdmmin = (data) => {
    const updateInfo = { role: "user" };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You want to remove ${user?.displayName} from admin?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/user/${data._id}`, updateInfo).then((res) => {
            const data = res.data;
            if (data.message === "updated") {
              refetch();
              swalWithBootstrapButtons.fire({
                title: "Made",
                text: `${user?.displayName} is an user now`,
                icon: "success",
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: `${user?.displayName} is still in same position`,
            icon: "error",
          });
        }
      });
  };
  return (
    <>
      <div>
        <div>
          <h3>Users: {users.length} </h3>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userr, i) => (
                  <tr key={userr._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={userr.photoURL} alt={userr.displayName} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{userr.displayName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h2>{userr.email}</h2>
                    </td>
                    <td>
                      <h2
                        className={`${
                          userr.role === "admin"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        } px-3 py-2 rounded-md text-xs inline-block text-white`}
                      >
                        {userr.role}
                      </h2>
                    </td>
                    <th>
                      {userr.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmmin(userr)}
                          className="btn btn-xs tooltip bg-red-500 text-white"
                          data-tip="Remove Admin"
                        >
                          <FaUserLargeSlash />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(userr)}
                          className="tooltip btn btn-xs bg-green-500 text-white"
                          data-tip="Make Admin"
                        >
                          <FaUserShield />
                        </button>
                      )}
                    </th>
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

export default ManageUser;
