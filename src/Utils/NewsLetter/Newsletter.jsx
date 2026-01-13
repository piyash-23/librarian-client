import { motion } from "framer-motion";

export default function SubscribeCTA() {
  return (
    <div className=" flex items-center justify-center px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-full bg-gradient-to-r from-[#120b4d] to-[#1b136b] rounded-2xl px-6 py-14 sm:px-12 text-center text-white"
      >
        {/* Title */}
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Subscribe For Get Update <br className="hidden sm:block" />
          Every New Event
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 text-sm sm:text-base text-gray-300 max-w-xl mx-auto"
        >
          Get the latest updates of new books, stocks and many more.
        </motion.p>

        {/* Input + Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button className="w-full sm:w-auto px-7 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-medium">
            Subscribe
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
