import React from "react";
import { motion } from "framer-motion";
import HomeSwiper from "../../../Utils/HomeSwiper/HomeSwiper";
import Coverage from "../../../Utils/Coverage/Coverage";
import WhyUs from "../../../Utils/WhyUs/WhyUs";
import Genres from "../../../Utils/Genre/Genres";
import FeaturedBooks from "../../../Utils/Feature Books/FeaturedBooks";
import SubscribeCTA from "../../../Utils/NewsLetter/Newsletter";

const secitons = [
  HomeSwiper,
  FeaturedBooks,
  Coverage,
  Genres,
  WhyUs,
  SubscribeCTA,
];

const Home = () => {
  return (
    <div>
      {secitons.map((Section, i) => (
        <motion.section
          key={i}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          <Section />
        </motion.section>
      ))}
    </div>
  );
};

export default Home;
