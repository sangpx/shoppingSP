import React from "react";
import "./Slider.scss";
import { slider_img_1, slider_img_2, slider_img_3 } from "../../utils/images";

const Slider = () => {
  return (
    <div>
      <div className="hero-slider">
        <div className="hero-slider-item">
          <img src={slider_img_1} alt="slider_img" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
