import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import useAxios from "../../Hooks/UseAxios/useAxios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const PostBook = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const afterSubmit = (data) => {
    data.sellerEmail = user?.email;

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
        confirmButtonText: "Post",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .post("/books", data)
            .then((res) => {
              const data = res.data;
              if (data.message === "book added") {
                swalWithBootstrapButtons.fire({
                  title: "Posted",
                  text: "Your book has been added.",
                  icon: "success",
                });
                navigate("/dashboard/my-books");
              }
            })
            .catch((error) => {
              if (error) {
                swalWithBootstrapButtons.fire({
                  title: "Something went wrong",
                  text: "Your imaginary file is safe :)",
                  icon: "error",
                });
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-extrabold my-3">
          Post your book here
        </h1>
      </div>
      <div className=" flex items-center justify-center p-4">
        <form className="w-full" onSubmit={handleSubmit(afterSubmit)}>
          <div className="w-full  bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
            {/* LEFT SIDE - info panel */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-10 text-white relative flex flex-col justify-center">
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-blue-600 rounded-full opacity-20 -translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400 rounded-full opacity-30 translate-x-10 translate-y-10"></div>
              {/* book title */}
              <div>
                <label className="label text-white relative z-50">
                  Book Title
                </label>
                <input
                  type="text"
                  placeholder="Book Title"
                  className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                  {...register("title", {
                    required: "Book Title is required",
                  })}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              {/*Author */}
              <div>
                <label className="label text-white relative z-50 mt-3">
                  Author Name
                </label>
                <input
                  type="text"
                  placeholder="Author Title"
                  className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                  {...register("author", {
                    required: "Author Title is required",
                  })}
                />
                {errors.autho && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>
              {/*category */}
              <div>
                <label className="label text-white relative z-50 mt-3">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Book category"
                  className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                  {...register("category", {
                    required: "Book category is required",
                  })}
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
              {/*price */}
              <div>
                <label className="label text-white relative z-50 mt-3">
                  price
                </label>
                <input
                  type="text"
                  placeholder="Book price"
                  className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                  {...register("price", {
                    required: "Book price is required",
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              {/*stock */}
              <div>
                <label className="label  text-white relative z-50 mt-3">
                  Stock
                </label>
                <input
                  type="number"
                  placeholder="stock"
                  className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                  {...register("stock", {
                    required: "Book stock is required",
                  })}
                />
                {errors.stock && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>
              {/*pages */}
              <div>
                <label className="label  text-white relative z-50 mt-3">
                  pages
                </label>
                <input
                  type="number"
                  placeholder="pages"
                  className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                  {...register("pages", {
                    required: "Book pages is required",
                  })}
                />
                {errors.pages && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.pages.message}
                  </p>
                )}
              </div>
              {/* readingLevel */}
              <div>
                <label className="label mt-3">Reading level</label>
                <select
                  className=" focus:outline-none w-full px-4 py-3 text-black bg-transparent"
                  {...register("readingLevel", { required: true })}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermedite">Intermedite</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              {/* description */}
              <div>
                <label className="label mt-3">Short Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full px-4 py-3 focus:outline-none border-b "
                  {...register("description", {
                    register: "Enter Description",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT SIDE — SIGNUP FORM */}
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center relative z-10 text-black">
              {/*publisher */}
              <div>
                <label className="label mt-3">publisher</label>
                <input
                  type="text"
                  placeholder="publisher"
                  className="w-full px-4 py-3 focus:outline-none border-b "
                  {...register("publisher", {
                    required: "publisher is required",
                  })}
                />
                {errors.publisher && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.publisher.message}
                  </p>
                )}
              </div>
              {/*edition */}
              <div>
                <label className="label mt-3">edition</label>
                <input
                  type="text"
                  placeholder="edition"
                  className="w-full px-4 py-3 focus:outline-none border-b "
                  {...register("edition", {
                    required: "edition is required",
                  })}
                />
                {errors.edition && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.edition.message}
                  </p>
                )}
              </div>
              {/* language */}
              <div>
                <label className="label mt-3">Select Book language</label>
                <select
                  className=" focus:outline-none w-full px-4 py-3 text-black bg-transparent"
                  {...register("language", { required: true })}
                >
                  <option value="bangla">Bangla</option>
                  <option value="english">English</option>
                </select>
              </div>
              {/*originalPrice */}
              <div>
                <label className="label mt-3">original Price</label>
                <input
                  type="text"
                  placeholder="original Price"
                  className="w-full px-4 py-3 focus:outline-none border-b "
                  {...register("originalPrice", {
                    required: "original Price is required",
                  })}
                />
                {errors.originalPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.originalPrice.message}
                  </p>
                )}
              </div>
              {/*coverImage */}
              <div>
                <label className="label mt-3">Cover Image Link</label>
                <input
                  type="text"
                  placeholder="Cover Image Link"
                  className="w-full px-4 py-3 focus:outline-none border-b "
                  {...register("coverImage", {
                    required: "cover Image is required",
                  })}
                />
                {errors.coverImage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.coverImage.message}
                  </p>
                )}
              </div>
              {/* binding */}
              <div>
                <label className="label mt-3">Book Binding</label>
                <select
                  className=" focus:outline-none w-full px-4 py-3 text-black bg-transparent"
                  {...register("binding", { required: true })}
                >
                  <option value="Hard Cover">Hard Cover</option>
                  <option value="Paper Back">Paper Back</option>
                </select>
              </div>

              {/*short description */}
              <div>
                <label className="label mt-3">Short Description</label>
                <textarea
                  name="shortDescription"
                  placeholder="Short Description"
                  className="w-full px-4 py-3 focus:outline-none border-b "
                  {...register("shortDescription", {
                    register: "Enter a short Description",
                  })}
                />
                {errors.shortDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>
              {/*tags */}
              <div>
                <label className="label mt-3">tags</label>
                <input
                  type="text"
                  placeholder="tags"
                  className="w-full px-4 py-3 focus:outline-none border-b "
                  {...register("tags", {
                    required: "Tag is required",
                  })}
                />
                {errors.tags && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tags.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg cursor-pointer my-5"
          >
            Add the book
          </button>
        </form>
      </div>
    </>
  );
};

export default PostBook;
