import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HomeSwiper = () => {
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
                  <button className="btn bg-transparent text-cyan-300 shadow-none mx-3 hover:bg-cyan-300 hover:text-black">
                    Browse Books
                  </button>
                  <button className="btn bg-transparent text-cyan-300 shadow-none mx-3 hover:bg-cyan-300 hover:text-black">
                    Be a Librarian
                  </button>
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
                  <button className="btn bg-blue-100 text-blue-800 px-6 py-3 rounded-md hover:bg-blue-200 transition">
                    Browse Books
                  </button>
                  <button className="btn bg-transparent text-cyan-300 shadow-none mx-3 hover:bg-cyan-300 hover:text-black">
                    Be a Librarian
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="h-full">
            <div className="swiper-3 swipe rounded-lg flex items-center">
              <div>
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
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HomeSwiper;
