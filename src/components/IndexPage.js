/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import {
  duri0,
  duri1,
  duri2,
  duri3,
  duri4,
  Group3,
  Group4,
  Group5,
} from "../static";
import IndexPostGrid from "./IndexPostGrid";
import SlickCarousel from "./SlickCarousel";

const IndexPage = () => {
  const scrollRef = useRef();

  const novels = [
    <div css={novelsStyle}>
      <img src={Group3} key="Group3" alt="nov-group3" />
    </div>,
    <div css={novelsStyle}>
      <img src={Group4} key="Group4" alt="nov-group4" />
    </div>,
    <div css={novelsStyle}>
      <img src={Group5} key="Group5" alt="nov-group5" />
    </div>,
  ];
  const duris = [
    <div css={durisStyle}>
      <div className="thumbNail">
        <img src={duri0} key="duri0" alt="duri0" />
      </div>
      <div className="title">두리야</div>
      <div className="content">자비</div>
    </div>,
    <div css={durisStyle}>
      <div className="thumbNail">
        <img src={duri1} key="duri1" alt="duri1" />
      </div>
      <div className="title">미안해...</div>
      <div className="content">자비</div>
    </div>,
    <div css={durisStyle}>
      <div className="thumbNail">
        <img src={duri2} key="duri2" alt="duri2" />
      </div>
      <div className="title">이 프로젝트는 잠시 멈추려고 해...</div>
      <div className="content">자비</div>
    </div>,
    <div css={durisStyle}>
      <div className="thumbNail">
        <img src={duri3} key="duri3" alt="duri3" />
      </div>
      <div className="title">다음엔 꼭 완성도 높게 만들어 줄께</div>
      <div className="content">자비</div>
    </div>,
    <div css={durisStyle}>
      <div className="thumbNail">
        <img src={duri4} key="duri4" alt="duri4" />
      </div>
      <div className="title">그때를 기약하며 !!!</div>
      <div className="content">자비</div>
    </div>,
  ];
  const rest_settings = {
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 500, //화면 사이즈 768px
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, []);

  return (
    <div css={IndexPageStyle}>
      <div ref={scrollRef} />
      <SlickCarousel slides={novels} />
      <IndexPostGrid
        title="두리 갤러리"
        slides={duris}
        rest_settings={rest_settings}
      />
      <IndexPostGrid
        title="두리 갤러리"
        slides={duris}
        rest_settings={rest_settings}
      />
      <IndexPostGrid
        title="두리 갤러리"
        slides={duris}
        rest_settings={rest_settings}
      />
      <IndexPostGrid
        title="두리 갤러리"
        slides={duris}
        rest_settings={rest_settings}
      />
      <IndexPostGrid
        title="두리 갤러리"
        slides={duris}
        rest_settings={rest_settings}
      />
      <IndexPostGrid
        title="두리 갤러리"
        slides={duris}
        rest_settings={rest_settings}
      />
    </div>
  );
};

export default IndexPage;

const novelsStyle = css`
  width: 100%;
  img {
    width: 100%;
    border-radius: 0.25rem;
    object-fit: cover;
  }
`;
const durisStyle = css`
  height: 17rem;
  padding: 1rem;
  .thumbNail {
    height: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // object-position: 0% 0%;
      border-radius: 0.25rem;
    }
  }

  .title {
    height: 30%;
  }
  .info {
    height: 20%;
  }
`;
const IndexPageStyle = css`
  display: flex;

  flex-direction: column;
`;
