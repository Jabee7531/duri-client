/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/authState";
import useReadCommentsQuery from "../hooks/query/useReadCommentsQuery";
import useReadPostQuery from "../hooks/query/useReadPostQuery";
import useCustomError from "../hooks/useCustomError";
import { createComment } from "../lib/api/comment/createComment";
import { deletePost } from "../lib/api/post/deletePost";
import { likePost } from "../lib/api/post/likePost";
import ContentDivider from "./ContentDivider";
import CommentForm from "./form/CommentForm";

const PostRead = () => {
  const { id } = useParams();
  const user = useRecoilValue(userState);
  const customError = useCustomError();
  const navigate = useNavigate();

  const [commentInput, setCommentInput] = useState("");
  const onContentChange = (e) => setCommentInput(e.target.value);

  const { data: post, isLoading: postLoding } = useReadPostQuery(id);
  const { data: comments, isLoading: commentsLoding } = useReadCommentsQuery(
    id,
    0
  );

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const result = await deletePost(user?.id, post.id);
      navigate("/", { replace: true });
    } catch (e) {
      customError(e.response.status);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const reuslt = await createComment(user?.id, post.id, commentInput, 0);
      window.location.reload();
    } catch (e) {
      customError(e.response?.status);
    }
  };

  const onlike = async (e) => {
    e.preventDefault();
    try {
      const result = await likePost(user?.id, post.id);
      window.location.reload();
    } catch (e) {
      customError(e.response.status);
    }
  };

  return postLoding || commentsLoding ? (
    <div>loding</div>
  ) : (
    <div css={PostReadStyle}>
      <div className="header">
        <div className="title">{post.title}</div>
        {post.fk_user_id === user?.id && (
          <div className="toolbar">
            <Link to={`/editor`} replace={true} state={{ data: post }}>
              <button>수정</button>
            </Link>
            <button onClick={onDelete}>삭제</button>
          </div>
        )}
        <div className="info">
          <div className="left">
            {post.author} , {post.created_at}
          </div>
          <div className="right" onClick={onlike}>
            🔥 {post.likes}
          </div>
        </div>
      </div>
      <div className="body">
        <div className="thumbnail">
          {post?.thumbnail && <img src={post.thumbnail} alt="boardThumbnail" />}
        </div>
        <div className="postContent">{post.content}</div>
      </div>
      <div className="footer">prod by {post.author}</div>
      <ContentDivider />
      <div className="comment">
        <b>{comments.comments.length}개의 댓글</b>
        <div className="enterComment">
          <ReactTextareaAutosize
            className="commentInputBox"
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={onContentChange}
          />
          <button onClick={onSubmit}>댓글 달기</button>
        </div>
        {comments.comments.map((comment, i) => (
          <div key={comment.id}>
            <CommentForm comment={comment} />
            <ContentDivider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostRead;

const PostReadStyle = css`
    display: flex;
    flex-direction: column;

    word-break:break-all;
    white-space: pre-wrap;
    
    .header{

        .title{
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
        }

        .toolbar{
            display: flex;
            justify-content: flex-end;
            margin: 1rem 0;
            color: gray;

            button{
                color: gray;
                font-size: 1rem;
                background: none;
                border: none;
                cursor: pointer;
            }
        }

        .info{
            display: flex;
            font-size: 0.8rem;
            justify-content: space-between;

            color: gray;

            .left{
            }

            .right{
                cursor: pointer;
                &:hover{
                    font-weight: bold;
                }
            }
        }
    }

    .body{
        margin: 3rem 0;

        .thumbnail{
            img{
                width: 100%;
                object-fit: cover;
            }
        }

        .postContent{

        }
    }

    .footer{
        margin - bottom: 1rem;
    }

    .comment{
        display: flex;
        flex-direction: column;
        margin-top: 3rem;

        b{
            margin-bottom: 1rem;
        }

        .enterComment{
            display: flex;
            flex-direction: column;

            .commentInputBox{
                background: none;

                width: 100%-2px;
                min-height: 3rem;

                resize: none;
                outline: none;
                border: 1px solid green;
            }

            button{
                background: black;
                display: inline-flex;

                height: 2rem;
                width: 5rem;
                margin: 0.5rem 0 ;

                align-self: flex-end;
                align-items: center;
                justify-content: space-around;

                border: 1px solid ;
                border-radius: 0.5rem;
                cursor: pointer;

                font-size: 0.9rem;
                font-weight: bold;
                letter-spacing: 0.08rem;
                color: white;
                background-color: green;

                &:hover{
                    background - color: red;
                }
            }
        }
    }
`;
