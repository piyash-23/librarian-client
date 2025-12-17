import React from "react";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import useRole from "../../../Hooks/UseRole/useRole";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../Components/Photo Upload/photoUpload";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  const { user, updateUserProfile } = UseAuth();
  // console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { name, email, photo, number } = data;
    // console.log(photo);
    const image = photo[0];
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 512,
      useWebWorker: true,
    };
    const compressedImage = await imageCompression(image, options);
    const photoURL = await uploadImage(compressedImage);
    const updatedProfile = {
      email: email,
      displayName: name,
      photoURL: photoURL,
      phoneNumber: number,
    };
    // console.log(updatedProfile);
    try {
      updateUserProfile(updatedProfile).then(() => {
        navigate("/dashboard/my-profile");
      });
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className=" w-full max-w-md rounded-2xl shadow-lg p-6">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-500"
          />
          <h2 className="mt-4 text-xl font-semibold">{user.displayName}</h2>
          <p className="text-sm text-gray-500">{role}</p>
          <p className="text-sm text-gray-500">User ID: {user?.uid}</p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Role</span>
            <span className="font-medium">{role}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary text-secondary w-full max-w-lg rounded-xl p-6 relative mx-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Profile</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  {...register("name")}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  {...register("email")}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Number</label>
                <input
                  type="tel"
                  defaultValue={user?.phoneNumber}
                  {...register("number")}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Image URL
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-ghost focus:outline-none"
                  {...register("photo")}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full border cursor-pointer border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
