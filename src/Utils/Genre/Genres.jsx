import React from "react";
const categories = [
  { name: "Fiction", icon: "📖" },
  { name: "Non-Fiction", icon: "📚" },
  { name: "Mystery & Thriller", icon: "🕵️‍♂️" },
  { name: "Science Fiction", icon: "🚀" },
  { name: "Fantasy", icon: "🐉" },
  { name: "Romance", icon: "💗" },
  { name: "Historical Fiction", icon: "🏺" },
  { name: "Self-Help", icon: "🌱" },
  { name: "Biography", icon: "👤" },
  { name: "Children’s Books", icon: "🧸" },
  { name: "Horror", icon: "👻" },
  { name: "Poetry", icon: "✒️" },
];
const Genres = () => {
  return (
    <>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Here is the best selling categories
          </h2>
          <p className="text-gray-600 mb-12">
            Explore your favorite genres and discover new reads.
          </p>

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm 
              hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                  {cat.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Genres;
