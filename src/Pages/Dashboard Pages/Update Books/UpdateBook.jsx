import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../../Hooks/UseAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { data: singleBook = {} } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const afterSubmit = (data) => {
    // console.log(data);
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
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/books/${id}`, data)
            .then((res) => {
              const data = res.data;
              if (data.message === "book updated") {
                navigate("/dashboard/my-books");
                swalWithBootstrapButtons.fire({
                  title: "Updated!",
                  text: "Your book has been updated.",
                  icon: "success",
                });
              }
            })
            .catch((error) => console.log(error));
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your file is not updated",
            icon: "error",
          });
        }
      });
  };
  const {
    title,
    author,
    category,
    publisher,
    coverImage,
    edition,
    stock,
    tags,
    price,
    pages,
  } = singleBook;
  //   console.log(singleBook);
  return (
    <>
      <div>
        <div>
          <h1 className="text-center font-extrabold text-4xl my-3">
            Update Your book data
          </h1>
          <div>
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
                        defaultValue={title}
                        className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                        {...register("title")}
                      />
                    </div>
                    {/*Author */}
                    <div>
                      <label className="label text-white relative z-50 mt-3">
                        Author Name
                      </label>
                      <input
                        type="text"
                        placeholder="Author Title"
                        defaultValue={author}
                        className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                        {...register("author")}
                      />
                    </div>
                    {/*category */}
                    <div>
                      <label className="label text-white relative z-50 mt-3">
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="Book category"
                        defaultValue={category}
                        className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                        {...register("category")}
                      />
                    </div>
                    {/*price */}
                    <div>
                      <label className="label text-white relative z-50 mt-3">
                        price
                      </label>
                      <input
                        type="text"
                        placeholder="Book price"
                        defaultValue={price}
                        className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                        {...register("price")}
                      />
                    </div>
                    {/*stock */}
                    <div>
                      <label className="label  text-white relative z-50 mt-3">
                        Stock
                      </label>
                      <input
                        type="number"
                        placeholder="stock"
                        defaultValue={stock}
                        className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                        {...register("stock")}
                      />
                    </div>
                    {/*pages */}
                    <div>
                      <label className="label  text-white relative z-50 mt-3">
                        pages
                      </label>
                      <input
                        type="number"
                        placeholder="pages"
                        defaultValue={pages}
                        className="w-full px-4 py-3 focus:outline-none border-b text-white relative z-50"
                        {...register("pages")}
                      />
                    </div>
                    {/* readingLevel */}
                    <div>
                      <label className="label mt-3">Reading level</label>
                      <select
                        className=" focus:outline-none w-full px-4 py-3 text-black bg-transparent"
                        {...register("readingLevel")}
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
                        {...register("description")}
                      />
                    </div>
                  </div>

                  {/* RIGHT SIDE — SIGNUP FORM */}
                  <div className="w-full md:w-1/2 p-10 flex flex-col justify-center relative z-10 text-black">
                    {/*publisher */}
                    <div>
                      <label className="label mt-3">publisher</label>
                      <input
                        type="text"
                        defaultValue={publisher}
                        placeholder="publisher"
                        className="w-full px-4 py-3 focus:outline-none border-b "
                        {...register("publisher")}
                      />
                    </div>
                    {/*edition */}
                    <div>
                      <label className="label mt-3">edition</label>
                      <input
                        type="text"
                        placeholder="edition"
                        defaultValue={edition}
                        className="w-full px-4 py-3 focus:outline-none border-b "
                        {...register("edition")}
                      />
                    </div>
                    {/* language */}
                    <div>
                      <label className="label mt-3">Select Book language</label>
                      <select
                        className=" focus:outline-none w-full px-4 py-3 text-black bg-transparent"
                        {...register("language")}
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
                        {...register("originalPrice")}
                      />
                    </div>
                    {/*coverImage */}
                    <div>
                      <label className="label mt-3">Cover Image Link</label>
                      <input
                        type="text"
                        placeholder="Cover Image Link"
                        defaultValue={coverImage}
                        className="w-full px-4 py-3 focus:outline-none border-b "
                        {...register("coverImage")}
                      />
                    </div>
                    {/* binding */}
                    <div>
                      <label className="label mt-3">Book Binding</label>
                      <select
                        className=" focus:outline-none w-full px-4 py-3 text-black bg-transparent"
                        {...register("binding")}
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
                        {...register("shortDescription")}
                      />
                    </div>
                    {/*tags */}
                    <div>
                      <label className="label mt-3">tags</label>
                      <input
                        type="text"
                        placeholder="tags"
                        defaultValue={tags}
                        className="w-full px-4 py-3 focus:outline-none border-b "
                        {...register("tags")}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg cursor-pointer my-5"
                >
                  Update Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBook;
