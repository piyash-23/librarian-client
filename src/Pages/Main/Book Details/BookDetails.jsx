import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { BsArrowRight } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { BiDownload, BiShare } from "react-icons/bi";
import UseAuth from "../../../Hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import { GiFlexibleStar } from "react-icons/gi";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { refetch, data: bookData = {} } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  const {
    coverImage,
    title,
    description,
    price,
    author,
    language,
    binding,
    sellerEmail,
  } = bookData;

  const openMoal = () => {
    refetch();
    document.getElementById("cart").showModal();
  };

  //   console.log(bookData);
  const addToCart = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must log in before place an order",
        footer: '<a href="/login">Log in now</a>',
      });
      return;
    }
    const toAdd = {
      price,
      title,
      sellerEmail,
      buyerEmail: user.email,
      coverImage,
      author,
      binding,
    };

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
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Add to cart",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/carts", toAdd).then((res) => {
            const data = res.data;
            if (data.message === "added to cart") {
              swalWithBootstrapButtons.fire({
                title: "Added!",
                text: "Your book has been added to cart.",
                icon: "success",
              });
            }
          });
        }
      });
  };
  return (
    <>
      <dialog id="cart" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <fieldset className="fieldset rounded-box p-4">
            <legend className="fieldset-legend">Book Details</legend>

            <label className="label">Book</label>
            <input
              type="text"
              className="input focus:outline-none w-full"
              defaultValue={title}
              readOnly
            />

            <label className="label">Price</label>
            <input
              type="text"
              className="input focus:outline-none w-full"
              defaultValue={price}
              readOnly
            />

            <label className="label">Author</label>
            <input
              type="text"
              className="input focus:outline-none w-full"
              defaultValue={author}
              readOnly
            />
            <label className="label">Your Name</label>
            <input
              type="text"
              className="input focus:outline-none w-full"
              defaultValue={user?.displayName}
            />
            <label className="label">Your Email</label>
            <input
              type="text"
              className="input focus:outline-none w-full"
              defaultValue={user?.email}
            />
          </fieldset>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={addToCart}
                className="btn border-none bg-[#393E46] text-white w-full"
              >
                Add To Cart
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div>
        <div className=" p-4 md:p-8 lg:p-12">
          <div className=" mx-auto rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10 lg:p-12">
              {/* Left Column - Book Cover */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-64 md:w-80 shadow-2xl rounded-sm"
                  />
                </div>
                <h1 className="text-2xl font-extrabold">{price} taka</h1>
              </div>

              {/* Right Column - Book Details */}
              <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-2">
                  {title}
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-6">
                  {author}
                </p>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  Get ready to uncover the dark secrets and betrayals in the
                  book. A thrilling adventure awaits you.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <button
                    onClick={openMoal}
                    className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Add to cart
                    <BsArrowRight size={18} />
                  </button>
                  <button
                    className="border border-gray-300 p-3 rounded-full hover:bg-gray-100 transition-colors hover:text-black tooltip cursor-pointer"
                    data-tip="Give Rating"
                  >
                    <GiFlexibleStar size={20} />
                  </button>
                  <button className="border border-gray-300 p-3 rounded-full hover:bg-gray-100 transition-colors hover:text-black">
                    <BiShare size={20} />
                  </button>
                  <button className="border border-gray-300 p-3 rounded-full hover:bg-gray-100 transition-colors hover:text-black">
                    <BiDownload size={20} />
                  </button>
                </div>

                {/* Description Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                </div>

                {/* Review Section */}

                {/* Additional Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Editors</h3>
                    <p className="text-sm text-gray-700">{author}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Language</h3>
                    <p className="text-sm text-gray-700">{language}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="font-semibold mb-2">Binding</h3>
                    <p className="text-sm text-gray-700">{binding}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
