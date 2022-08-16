/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import customAnimation from "../lib/customAnimation";
import palette from "../lib/palette";
import { dog } from "../static";

const PostGridItem = ({ post }) => {
  return (
    <div css={PostGridItemStyle}>
      <Link to={`/post/read/${post.id}`} state={{ data: post }}>
        <div className="contentHeader">
          <img
            src={post.thumbnail === "" ? dog : post.thumbnail}
            alt="thumbnail"
          />
        </div>
        <div className="contentBody">
          <div className="title">
            {post.title.substring(0, 15)}
            {post.title.length > 15 && "..."}
          </div>
          <div className="content">
            {post.content.substring(0, 100)}
            {post.content.length > 100 && "..."}
          </div>
          <div className="time">{post.created_at}</div>
        </div>
      </Link>
      <div className="contentFooter">
        <div className="left">
          Prod by <b>{post.author}</b>
        </div>
        <div className="right">🔥 {post.likes}</div>
      </div>
    </div>
  );
};

export default PostGridItem;

const PostGridItemStyle = css`
  display: block;
  word-break: break-all;

  height: 23rem;

  background-color: ${palette.white};
  color: #393e46;
  border-radius: 0.3rem;

  transition: all 0.3s;
  transform: translate3d(0, 0, 0);

  animation: ${customAnimation.smoothAppear} 1s ease-in-out;

  a {
    text-decoration: none;

    &:link {
      color: #393e46;
    }
    &:visited {
      color: #393e46;
    }
  }

  &:hover {
    transition: all 0.3s;
    transform: translate3d(0, -0.25rem, 0);
    box-shadow: 0px 1.125rem 1.125rem rgba(67, 67, 67, 0.08);
  }

  .contentHeader {
    height: 50%;
    margin: 0.2rem 0.2rem 0 0.2rem;

    img {
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .contentBody {
    height: 40%;
    padding: 0.5rem;

    .title {
      height: 30%;
      font-size: 1rem;
      font-weight: bold;
    }

    .content {
      height: 50%;
      font-size: 0.8rem;
      line-height: 1;
    }

    .time {
      height: 20%;
      font-size: 0.8rem;
    }
  }

  .contentFooter {
    display: flex;
    padding: 0.5rem;
    height: 10%;
    border-top: 1px solid;
    border-top-color: #c9c9c9;
    border-bottom-right-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    padding-left: 1rem;

    justify-content: space-between;
    align-items: center;

    .left {
      display: inline-block;
    }

    .right {
      display: inline-block;
    }
  }
`;
