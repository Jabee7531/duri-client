// TODO: 대댓글 최적화 하기
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/authState";
import useCustomError from "../../hooks/useCustomError";
import { deleteComment } from "../../lib/api/comment/deleteComment";
import { updateComment } from "../../lib/api/comment/updateComment";

const ReplyForm = ({ reply }) => {
  const user = useRecoilValue(userState);
  const customError = useCustomError();
  const [commentInput, setCommentInput] = useState(reply.content);
  const [isEdit, setIsEdit] = useState(false);
  const onContentChange = (e) => setCommentInput(e.target.value);

  const onEdit = async (e) => {
    e.preventDefault();
    try {
      setIsEdit(!isEdit);
    } catch (e) {
      customError(e.response.status);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteComment(user?.id, reply.id);
      window.location.reload();
    } catch (e) {
      customError(e.response.status);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateComment(user?.id, reply.id, commentInput);
      window.location.reload();
    } catch (e) {
      customError(e.response.status);
    }
  };

  return (
    <>
      <div css={ReplyFormStyle}>
        <div className="header">
          <div className="left">
            <div className="userNickname">{reply.commenter}</div>
            <div className="date">{reply.created_at}</div>
          </div>
          {user?.id && (
            <div className="right">
              <button onClick={onEdit}>수정</button>
              <button onClick={onDelete}>삭제</button>
            </div>
          )}
        </div>
        {isEdit && user?.id ? (
          <div className="editReply">
            <ReactTextareaAutosize
              className="editReplyInputBox"
              placeholder="댓글을 입력하세요"
              value={commentInput}
              onChange={onContentChange}
            />
            <button disabled={false} onClick={onSubmit}>
              수정하기
            </button>
          </div>
        ) : (
          <div className="content">{reply.content}</div>
        )}
      </div>
    </>
  );
};

export default ReplyForm;

const ReplyFormStyle = css`
    display: flex;
    flex-direction: column;
    padding: 0.5rem ;

    .header{
        .left{
            .userNickname{
                font-weight: bold;
                font-size: 0.75rem;
            }
    
            .date{
                font-size: 0.75rem;
            }
        }

        .right{
            button{
                color: gray;
                font-size: 0.75rem;
                background: none;
                border: none;
                cursor: pointer;
            }
        }
    }

    .editReply{
        display: flex;
        flex-direction: column;

        .editReplyInputBox{
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
    .content{
        margin: 1.5rem 0;
        font-size: 0.75rem;
    }

    .reReply{
        font-size: 0.8rem;
        color: green;
    }
`;
