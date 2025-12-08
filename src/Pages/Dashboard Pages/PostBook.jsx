import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import useAxios from "../../Hooks/UseAxios/useAxios";

const PostBook = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submission = (data) => {
    data.sellerEmail = user?.email;
    console.log(data);
    axiosSecure
      .post("/books", data)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="max-w-7xl mx-auto p-6 bg-secondary shadow rounded">
        <h2 className="text-2xl font-bold mb-6">Add New Book</h2>

        <form
          onSubmit={handleSubmit(submission)}
          className="grid grid-cols-2 gap-4"
        >
          {/* BASIC INFO */}
          <input
            {...register("title", { required: true })}
            placeholder="Book Title"
            className="input w-full focus:outline-none"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}

          <input
            {...register("author", { required: true })}
            placeholder="Author Name"
            className="input w-full focus:outline-none"
          />
          <input
            {...register("publisher")}
            placeholder="Publisher"
            className="input w-full focus:outline-none"
          />
          <input
            {...register("edition")}
            placeholder="Edition"
            className="input w-full focus:outline-none"
          />

          <select
            {...register("language")}
            className="input w-full focus:outline-none"
          >
            <option defaultChecked>Language</option>
            <option>English</option>
            <option>Bangla</option>
            <option>Arabic</option>
          </select>

          <input
            {...register("category", { required: true })}
            placeholder="Category"
            className="input w-full focus:outline-none"
          />

          {/* PRICING */}
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Price"
            className="input w-full focus:outline-none"
          />
          <input
            type="number"
            {...register("originalPrice")}
            placeholder="Original Price"
            className="input w-full focus:outline-none"
          />
          <input
            type="number"
            {...register("stock", { required: true })}
            placeholder="Stock Quantity"
            className="input w-full focus:outline-none"
          />

          {/* IMAGES */}
          <input
            {...register("thumbnail", { required: true })}
            placeholder="Thumbnail URL"
            className="input col-span-2"
          />
          <input
            {...register("coverImage")}
            placeholder="Cover Image URL"
            className="input col-span-2"
          />

          {/* DESCRIPTION */}
          <textarea
            {...register("shortDescription")}
            placeholder="Short Description"
            className="input col-span-2"
          />
          <textarea
            {...register("description")}
            placeholder="Full Description"
            className="input col-span-2 w-full focus:outline-none"
          />

          <input
            type="number"
            {...register("pages")}
            placeholder="Total Pages"
            className="input w-full focus:outline-none"
          />

          <select
            {...register("binding")}
            className="input w-full focus:outline-none"
          >
            <option>Paperback</option>
            <option>Hardcover</option>
          </select>

          <select
            {...register("readingLevel")}
            className="input w-full focus:outline-none"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          {/* EXTRA */}
          <input
            {...register("tags")}
            placeholder="Tags (comma separated)"
            className="input col-span-2 w-full focus:outline-none"
          />

          <label className="flex items-center gap-2 col-span-2">
            <input type="checkbox" {...register("featured")} />
            Featured Book
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded col-span-2 cursor-pointer"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  );
};

export default PostBook;
