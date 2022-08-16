/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useRef } from "react";
import { useRecoilState } from "recoil";
import { carouselState } from "../atoms/carouselState";
import useInterval from "../hooks/useInterval";
import customAnimation from "../lib/customAnimation";
import { shaman1, witch1 } from "../static";

const Carousel = () => {
  const data = [witch1, shaman1];

  const items = useMemo(() => {
    const items = [data[0], data.at(-1), data, data[0], data.at(-1)].flat();
    return items;
  }, []);

  const [currentSlide, setCurrentSlide] = useRecoilState(carouselState);
  const slideRef = useRef(null);

  const setInterval = useInterval();

  const next = async () => {
    setCurrentSlide(currentSlide + 1);
    if (currentSlide === data.length + 1) {
      slideRef.current.style.transition = "all 500ms ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
      setCurrentSlide(1);
      setTimeout(() => {
        slideRef.current.style.transition = "";
        slideRef.current.style.transform = `translateX(-100%)`;
      }, 500);
    } else {
      slideRef.current.style.transition = "all 500ms ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  };

  const prev = () => {
    setCurrentSlide(currentSlide - 1);
    if (currentSlide === 0) {
      slideRef.current.style.transition = "all 500ms ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
      setTimeout(() => {
        slideRef.current.style.transition = "";
        slideRef.current.style.transform = `translateX(-${data.length * 100}%)`;
        setCurrentSlide(data.length);
      }, 500);
    } else {
      slideRef.current.style.transition = "all 500ms ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  };

  setInterval(() => {
    next();
  }, 2000);

  const nextSlide = () => {
    next();
  };
  const prevSlide = () => {
    prev();
  };

  return (
    <div css={testStyle}>
      <div css={wrapper}>
        <div className="SliderContainer" ref={slideRef}>
          {items.map((item, i) => (
            <img src={item} key={i} />
          ))}
        </div>
        <div className="left">
          <button onClick={prevSlide}>{"<"}</button>
        </div>
        <div className="right">
          <button onClick={nextSlide}>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

const testStyle = css`
  width: 100%;

  animation: ${customAnimation.smoothAppear} 1s ease-in-out;
`;

const wrapper = css`
  position: relative;
  width: 100%;

  .SliderContainer {
    display: flex;
    height: 100%;
    width: 100%;
    transform: translateX(-100%);

    img {
      width: 100%;
      object-fit: fill;
    }
  }

  .left {
    position: absolute;
    top: 50%;
  }
  .right {
    position: absolute;
    left: 90%;
    top: 50%;
  }
`;
