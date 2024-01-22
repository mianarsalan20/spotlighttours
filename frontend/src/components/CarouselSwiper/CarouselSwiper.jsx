import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./carouselSwiper.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import CarouselImg from "../.././assets/images/Spotlight.jpg";
import CarouselImg1 from "../.././assets/images/Spotlight1.jpg";
import CarouselImg2 from "../.././assets/images/Spotlight2.jpg";

const CarouselSwiper = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper"
      >
        <SwiperSlide className="swiper-slide">
          <img src={CarouselImg} alt="Best Desert Safaris" />

          <h1 className="slider__content__title">Best Desert Safaris</h1>
          <p className="slider__content__text">
            Don’t miss our popular Evening Desert Safari
            <button className="slider__content__btn">
              <Link to={`/tours/6423400c7826af276f798a5d`}>Book Now</Link>
            </button>
          </p>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={CarouselImg1} alt="Best Dubai Tours" />

          <h1 className="slider__content__title">Best Dubai Tours </h1>
          <p className="slider__content__text">
            Discover Dubai's magic with our tours
            <button className="slider__content__btn">
              <Link to={`/tours`}>Book Now</Link>
            </button>
          </p>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={CarouselImg2} alt="" />

          <h1 className="slider__content__title">Best Rental Service</h1>
          <p className="slider__content__text">
            Drive your way to adventure with our rental cars
            <button className="slider__content__btn">
              <Link to={`/cars`}>Book Now</Link>
            </button>
          </p>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CarouselSwiper;
