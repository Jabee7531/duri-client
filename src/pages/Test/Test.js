/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { dori1, dori2, dori3, dori4 } from "../../static";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Test = () => {
  const slides = [
    <img src={dori1} alt="1" />,
    <img src={dori2} alt="2" />,
    <img src={dori3} alt="3" />,
    <img src={dori4} alt="4" />,
  ]

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div css={testStyle}>
      <Slider {...settings}>
        {slides.map((slide) => (
          slide
        ))}
      </Slider>
    </div>
  );
};

export default Test;
const testStyle = css`
  width: 100%;
  img{
      height: 30rem;
  }
`