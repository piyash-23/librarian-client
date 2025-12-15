import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/UseAxios/useAxios";

const HomeSwiper = () => {
  const axiosSecure = useAxios();
  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
  console.log(books);
  const toShow = books
    .filter((books) => books.publish === "published")
    .slice(0, 4);
  console.log(toShow);
  return (
    <>
      <div className="h-[80vh]">
        <Swiper
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper h-full"
        >
          <SwiperSlide className="h-full">
            <div className="swiper-1 swipe rounded-lg flex items-center">
              <div>
                <h1 className="text-4xl text-white font-extrabold">
                  Discover Your Next Great Read
                </h1>
                <p className="text-md my-5 text-gray-400 font-light">
                  Explore thousands of books across every genre. Fast delivery,
                  great prices, and personalized recommendations.
                </p>
                <div className="font-bold text-white">
                  <Link
                    to={"/all-books"}
                    className="btn bg-transparent text-cyan-300 shadow-none mx-3 hover:bg-cyan-300 hover:text-black"
                  >
                    Browse Books
                  </Link>
                  <Link
                    to={"/be-a-librarian"}
                    className="btn bg-transparent text-cyan-300 shadow-none mx-3 hover:bg-cyan-300 hover:text-black"
                  >
                    Be a Librarian
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <div className="swiper-2 swipe rounded-lg flex items-center">
              <div>
                <h1 className="text-4xl text-white font-extrabold">
                  Dive Into Fantasy Worlds
                </h1>
                <p className="text-md my-5 text-gray-400 font-light">
                  Lose yourself in epic adventures, magical realms, and
                  unforgettable characters.
                </p>
                <div className="font-bold text-white">
                  <Link
                    to={"/all-books"}
                    className="btn bg-blue-100 text-blue-800 px-6 py-3 rounded-md hover:bg-blue-200 transition"
                  >
                    Browse Books
                  </Link>
                  <Link
                    to={"/be-a-librarian"}
                    className="btn bg-transparent text-cyan-300 shadow-none mx-3 hover:bg-cyan-300 hover:text-black"
                  >
                    Be a Librarian
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="h-full">
            <div className="swiper-3 swipe rounded-lg flex items-center">
              <div className="flex-1 w-[100%]">
                <h1 className="text-4xl text-white font-extrabold">
                  Join Our Book Club & Save 20%
                </h1>
                <p className="text-md my-5 text-gray-400 font-light">
                  Become a member for early access to new releases, exclusive
                  discounts, and special recommendations.
                </p>
                <div className="font-bold text-white">
                  <button className="btn bg-blue-100 text-blue-800 px-6 py-3 rounded-md hover:bg-blue-200 transition">
                    Join Now
                  </button>
                  <button className="btn bg-transparent text-cyan-300 shadow-none mx-3 hover:bg-cyan-300 hover:text-black">
                    View Offers
                  </button>
                </div>
              </div>
              <div className="max-w-sm mx-auto bg-white rounded-3xl">
                <div className="w-full h-full flex justify-center items-center">
                  <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    spaceBetween={30}
                    loop={true}
                    grabCursor={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className="h-full min-h-[400px]"
                  >
                    {toShow.map((bok) => (
                      <SwiperSlide key={bok._id} className="h-full">
                        <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
                          {/* Image */}
                          <div className="p-4">
                            <div className="rounded-2xl overflow-hidden">
                              <img
                                src={bok.coverImage}
                                alt="Destination"
                                className="w-full h-56 object-cover"
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="px-6 pb-6">
                            <h2 className="text-2xl font-semibold text-gray-900">
                              {bok.title}
                            </h2>

                            {/* Price & Airport */}
                            <div className="flex items-center justify-between mt-4 text-gray-600">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-semibold text-gray-900">
                                  taka {bok.price}
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 mt-6">
                              <button className="flex-1 bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition">
                                <Link to={`/book-details/${bok._id}`}>
                                  Get Book
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HomeSwiper;
