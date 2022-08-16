/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/authState";
import useReadCommentsQuery from "../hooks/query/useReadCommentsQuery";
import useCustomError from "../hooks/useCustomError";
import { createComment } from "../lib/api/comment/createComment";
import ContentDivider from "./ContentDivider";
import ReplyForm from "./form/Replyfrom";

const ReplyRead = ({ comment }) => {
  const customError = useCustomError();
  const user = useRecoilValue(userState);
  const [readReplyToggle, setReadReplyToggle] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const onReplyChange = (e) => setReplyInput(e.target.value);
  const { data: replys, isLoading: replysLoding } = useReadCommentsQuery(
    comment.fk_post_id,
    1,
    comment.id
  );

  const onReadRelyToggle = async (e) => {
    e.preventDefault();
    try {
      setReadReplyToggle(!readReplyToggle);
    } catch (e) {}
  };

  const onReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createComment(
        user?.id,
        comment.fk_post_id,
        replyInput,
        1,
        comment.id
      );
      window.location.reload();
    } catch (e) {
      customError(e.response.status);
    }
  };
  return replysLoding ? (
    <div>loding</div>
  ) : (
    <div css={ReplyReadStyle}>
      <div className="replyToggleButton">
        <button onClick={onReadRelyToggle}>
          {readReplyToggle ? "숨기기" : `${replys.comments.length}개의 답글`}
        </button>
      </div>
      {readReplyToggle ? (
        <div className="replyForm">
          {replys.comments.map((reply, i) => (
            <div key={reply.id}>
              <ReplyForm reply={reply} />
              <ContentDivider />
            </div>
          ))}
          <div className="writeReplyBox">
            <ReactTextareaAutosize
              className="writeReplyInputBox"
              placeholder="댓글을 입력하세요"
              value={replyInput}
              onChange={onReplyChange}
            />
            <button disabled={false} onClick={onReplySubmit}>
              답글 달기
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReplyRead;

const ReplyReadStyle = css`
  display: flex;
  flex-direction: column;

  .replyToggleButton {
  }
  .replyForm {
    width: 95%;

    margin-left: auto;
    margin-top: 1rem;

    background-color: #f1f1f1;
    border: 1px solid #ebebeb;
    border-radius: 0.5rem;
  }
`;
