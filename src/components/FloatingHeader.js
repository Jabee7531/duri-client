/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/authState";
import media from "../lib/media";
import palette from "../lib/palette";
import { useSpring, animated } from "react-spring";

const FloatingHeader = () => {
  const user = useRecoilValue(userState);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const springStyle = useSpring({
    left: isHome ? "0" : "5rem",
    config: {
      friction: 16,
      tensiton: 160,
    },
  });

  return (
    <div css={FloatingHeaderStyle}>
      <div css={floatingHeaderContent}>
        <div className="left">
          <div className="box">
            <Link className="notice" to={"/"}>
              작품
            </Link>
            <Link className="work" to={"/post"}>
              속닥속닥
            </Link>
          </div>
          <animated.div css={selector} style={springStyle}></animated.div>
        </div>
        <div className="right">
          {user && (
            <NavLink className="writer" to={"/writer"}>
              <button>글적기</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingHeader;

const selector = css`
  position: absolute;
  width: 5rem;
  height: 2px;
  bottom: 0;
  background: ${palette.themeColor["500"]};
`;
const floatingHeaderContent = css`
  display: flex;
  height: 2.5rem;
  height: 100%;
  width: 70%;
  max-width: 768px;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  ${media.small} {
    width: 100%;
    margin: 0 0.5rem;
  }

  a {
    color: black;
    text-decoration: none;

    &:visited {
      color: black;
    }
  }

  .left {
    display: flex;
    position: relative;
    height: 100%;
    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;

      ${media.small} {
        font-size: 1rem;
      }

      .notice {
        width: 5rem;
        justify-content: center;
      }

      .work {
        width: 5rem;
        justify-content: center;
      }

      .board {
        width: 5rem;
        justify-content: center;
      }
    }
  }

  .right {
    .writer {
      button {
        display: inline-flex;

        height: 2rem;
        width: 6rem;
        margin: 0.5rem 0;

        align-self: flex-end;
        align-items: center;
        justify-content: space-around;

        border: 1px solid;
        border-radius: 0.5rem;
        cursor: pointer;

        font-size: 1.2rem;
        font-weight: bold;
        letter-spacing: 0.08rem;
        color: white;
        background-color: ${palette.themeColor["500"]};

        ${media.small} {
          height: 1.75rem;
          width: 4.5rem;

          font-size: 0.9rem;
        }

        &:hover {
        }
      }
    }
  }
`;
const FloatingHeaderStyle = css`
  display: flex;
  height: 100%;
  justify-content: center;
`;
