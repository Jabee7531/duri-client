/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { forwardRef } from "react";

const PostGridItemSkeleton = forwardRef(({}, ref) => {
  return (
    <div css={PostGridItemSkeletonStyle} ref={ref}>
      <div className="cardHeader">
        <div className="imageBox"></div>
      </div>
      <div className="cardBody"></div>
      <div className="cardFooter">
        <div className="infoBox"></div>
      </div>
    </div>
  );
});

export default PostGridItemSkeleton;

const shining = keyframes`
  from {
    opacity: 0.1;
  }
  to {
    opacity: 0.5;
  }
`;

const PostGridItemSkeletonStyle = css`
  display: block;
  animation: ${shining} 1.5s ease-in-out infinite;
  background: white;
  width: 100%;
  height: 20rem;
  box-shadow: 0px 1rem 1rem rgba(67, 67, 67, 0.03);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all ease-in 0.125s;

  .cardHeader {
    height: 50%;
    width: 100%;
    .imageBox {
      background: #dddddd;

      width: 100%;
      height: 100%;

      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  }

  .cardBody {
    height: 40%;
    width: 100%;
  }

  .cardFooter {
    height: 10%;
    width: 100%;

    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;

    background: #dddddd;
    .infoBox {
      padding: 0.5rem;

      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
  }
`;
