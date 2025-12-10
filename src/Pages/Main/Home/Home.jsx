import React from "react";
import HomeSwiper from "../../../Utils/HomeSwiper/HomeSwiper";
import Coverage from "../../../Utils/Coverage/Coverage";
import WhyUs from "../../../Utils/WhyUs/WhyUs";
import Genres from "../../../Utils/Genre/Genres";
import FeaturedBooks from "../../../Utils/Feature Books/FeaturedBooks";

const Home = () => {
  return (
    <div>
      <HomeSwiper></HomeSwiper>
      {/* latest books section */}
      <FeaturedBooks></FeaturedBooks>
      {/* coverage section */}
      <Coverage></Coverage>
      <Genres />
      <WhyUs />
    </div>
  );
};

export default Home;
