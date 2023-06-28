import React from "react";

import Slider from "react-slick";
import { slider_img_1, slider_img_2, slider_img_3 } from "../../utils/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Sliders = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>
      <img src={slider_img_1} alt="slider_img" />
      <img src={slider_img_2} alt="slider_img" />
      <img src={slider_img_3} alt="slider_img" />
    </Slider>
  );
};

export default Sliders;
