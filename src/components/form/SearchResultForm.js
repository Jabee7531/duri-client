/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Link } from "react-router-dom";
import customAnimation from "../../lib/customAnimation";
import palette from "../../lib/palette";
import { dog } from "../../static";
import ContentDivider from "../ContentDivider";

const SearchResultForm = ({ post }) => {
    return (
        <>
            <div css={SearchResultFormStyle}>
                <Link to={`/post/read/${post.id}`}>
                    <div css={thumbnail}>
                        <img src={dog} alt="thumbnail" />
                    </div>
                    <div css={content}>
                        <div className="userNickname">{post.author}</div>
                        <div className="title">{post.title.substring(0, 15)}{post.title.length > 15 && "..."}</div>
                        <div className="content">{post.content.substring(0, 90)}{post.title.length > 90 && "..."}</div>
                        <div className="date">{post.created_at} </div>
                    </div>
                </Link>
            </div>
            <ContentDivider />
        </>
    );
}

export default SearchResultForm


const SearchResultFormStyle = css`
    flex-direction: column;
    height: 25rem;
    word-break:break-all;
    border-radius: 0.5rem;

    margin: 2rem 0;

    animation: ${customAnimation.slide} 0.5s;

    a{
        text-decoration: none;

        &:link{
            color: black;
        }
        &:visited {
            color: black;
        }
    }
`

const thumbnail = css`
    height: 50%;

    img{
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const content = css`
    display: flex;
    flex-direction: column;
    height: 50%;
    background-color: ${palette.white};
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    padding: 0.5rem;

    .userNickname{
        font-weight: bold;
        font-size: 0.85rem;
        margin: 0.5rem 0;
    }

    .title{
        font-weight: bold;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }

    .content{
    }

    .date{
        margin-top: auto;
    }
`