// TODO: 대댓글 최적화 하기
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import { useRecoilValue } from "recoil"
import { userState } from "../../atoms/authState"
import useCustomError from "../../hooks/useCustomError"
import { createComment } from "../../lib/api/comment/createComment"
import { deleteComment } from "../../lib/api/comment/deleteComment"
import { updateComment } from "../../lib/api/comment/updateComment"
import ReplyRead from "../ReplyRead"

const CommentForm = ({ comment }) => {
    const user = useRecoilValue(userState)
    const customError = useCustomError()
    const [commentInput, setCommentInput] = useState(comment.content)
    const [replyInput, setReplyInput] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [writeReplyToggle, setWriteReplyToggle] = useState(false)
    const onContentChange = (e) => setCommentInput(e.target.value)
    const onReplyChange = (e) => setReplyInput(e.target.value)


    const onWriteRelyToggle = async (e) => {
        e.preventDefault()
        try {
            setWriteReplyToggle(!writeReplyToggle)
        } catch (e) {
            customError(e.response.status)
        }
    }

    const onEdit = async (e) => {
        e.preventDefault()
        try {
            setIsEdit(!isEdit)
        } catch (e) {
        }
    }

    const onDelete = async (e) => {
        e.preventDefault()
        try {
            const result = deleteComment(user?.id, comment.id)
            window.location.reload()
        } catch (e) {
            customError(e.response.status)
        }
    }

    const onEditSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await updateComment(
                user?.id,
                comment.id,
                commentInput,
            )
            window.location.reload()
        } catch (e) {
            customError(e.response.status)
        }
    }

    const onReplySubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await createComment(
                user?.id,
                comment.fk_post_id,
                replyInput,
                1,
                comment.id
            )
            window.location.reload()
        } catch (e) {
            customError(e.response.status)
        }
    }


    return (
        <>
            <div css={CommentFormStyle}>
                <div className="header">
                    <div className="left">
                        <div className="userNickname">
                            {comment.commenter}
                        </div>
                        <div className="date">
                            {comment.created_at}
                        </div>
                    </div>
                    {
                        comment.fk_user_id === user?.id &&
                        <div className="right">
                            <button onClick={onEdit}>수정</button>
                            <button onClick={onDelete}>삭제</button>
                        </div>
                    }
                </div>
                {isEdit && user?.id ?
                    <div className="editComment">
                        <ReactTextareaAutosize className="editCommentInputBox" placeholder="댓글을 입력하세요" value={commentInput} onChange={onContentChange} />
                        <button disabled={false} onClick={onEditSubmit}>수정하기</button>
                    </div>
                    :
                    <div className="content">
                        {comment.content}
                    </div>

                }
                {comment.has_replies ?
                    <div className="replyBox">
                        <ReplyRead comment={comment} />
                    </div>
                    :
                    <div className="replyButton">
                        <button onClick={onWriteRelyToggle}>{writeReplyToggle ? "숨기기" : "답글 달기"}</button>
                        {writeReplyToggle ?
                            <div className="writeReplyBox">
                                <ReactTextareaAutosize className="writeReplyInputBox" placeholder="댓글을 입력하세요" value={replyInput} onChange={onReplyChange} />
                                <button onClick={onReplySubmit}>답글 달기</button>
                            </div>
                            :
                            ""
                        }
                    </div>
                }
            </div>
        </>
    );
}

export default CommentForm

const CommentFormStyle = css`
    display: flex;
    flex-direction: column;

    padding: 1rem 0;

    .header{
        display: flex;
        justify-content: space-between;

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
    .editComment{
        display: flex;
        flex-direction: column;

        .editCommentInputBox{
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
    .writeReplyBox{
        display: flex;
        flex-direction: column;

        .writeReplyInputBox{
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
`