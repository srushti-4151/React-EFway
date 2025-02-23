import React from "react";
import SecondSection from "../../components/Secondsection";
import HomeSlider from "../../components/HomeSlider";
import FeaturedProducts from "../../components/FeaturedProducts";
import Banner from "../../components/Banner";
import Blog from "../../components/Blog";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <SecondSection />
      <FeaturedProducts/>
      <Banner />
      <Blog />
      <Footer />
    </>
  );
};

export default Home;
