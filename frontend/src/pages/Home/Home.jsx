import React from "react";
import Services from "../../components/Services/Services";
import FeaturedTour from "../../components/FeaturedTour/FeaturedTour";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import CarouselSwiper from "../../components/CarouselSwiper/CarouselSwiper";
import RecommendedCars from "../../components/CarCard/RecommendedCars";
import RecommendedBlogs from "../../components/BlogCard/RecommendedBlogs";
const Home = () => {
  return (
    <div>
      <CarouselSwiper />
      <Services />
      <FeaturedTour />
      <RecommendedCars />
      <RecommendedBlogs />
      <ImageGallery />
    </div>
  );
};

export default Home;
