import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { title, author, category, price, coverImage, shortDescription, _id } =
    book;
  return (
    <>
      <div>
        <div className=" flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Image Container */}
              <div className="relative h-96 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={coverImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/80 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-3xl font-bold mb-2"
                  >
                    {title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-sm text-gray-200 mb-4 flex items-center gap-1"
                  >
                    <span>📍</span> {author}
                  </motion.p>

                  {/* Property Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex items-center gap-6 mb-6 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {/* <Maximize2 size={18} className="text-gray-200" /> */}
                      <span>
                        Category:{" "}
                        <span className="font-semibold">{category}</span>
                      </span>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 font-bold text-xl"
                    >
                      {price} taka
                    </motion.div>

                    <Link to={`/book-details/${_id}`}>
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 40px rgba(255,255,255,0.3)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-white text-gray-900 rounded-full px-6 py-3 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        See More
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
