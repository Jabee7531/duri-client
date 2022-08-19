/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { duri1, duri2, duri3, duri4 } from "../../static";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Test = () => {
  const slides = [
    <img src={duri1} alt="1" />,
    <img src={duri2} alt="2" />,
    <img src={duri3} alt="3" />,
    <img src={duri4} alt="4" />,
  ];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div css={testStyle}>
      <Slider {...settings}>{slides.map((slide) => slide)}</Slider>
    </div>
  );
};

export default Test;
const testStyle = css`
  width: 100%;
  img {
    height: 30rem;
  }
`;
