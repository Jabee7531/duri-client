/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextareaAutosize from "react-textarea-autosize";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/authState";
import { useEffect, useState } from "react";
import { createPost } from "../lib/api/post/createPost";
import { updatePost } from "../lib/api/post/updatePost";
import useCustomError from "../hooks/useCustomError";
import s3Uploading from "../lib/aws/s3Uploading";

const PostWriter = () => {
  const user = useRecoilValue(userState);
  const customError = useCustomError();
  const location = useLocation();
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const onTitleChange = (e) => setTitleInput(e.target.value);
  const onContentChange = (e) => setContentInput(e.target.value);
  const navigate = useNavigate();
  const data = location.state?.data;

  useEffect(() => {
    if (data) {
      setTitleInput(data.title);
      setContentInput(data.content);
    }
  }, [data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let thumbnailName = "";
      if (thumbnail) {
        const result = await s3Uploading(thumbnail, "post/" + thumbnail.name);
        thumbnailName = result["body"]["name"];
      }
      const post = await createPost(
        user?.id,
        titleInput,
        contentInput,
        thumbnailName
      );
      navigate("/");
    } catch (e) {
      customError(e);
    }
  };

  const onEdit = async (e) => {
    e.preventDefault();
    try {
      let thumbnailName = data?.thumbnail;
      if (thumbnail) {
        const result = await s3Uploading(thumbnail, "post/" + thumbnail.name);
        thumbnailName = result["body"]["name"];
      }
      const result = await updatePost(
        user?.id,
        data.id,
        titleInput,
        contentInput,
        thumbnailName
      );

      navigate(`/post/read/${data.id}`, {
        replace: true,
        state: { data: result },
      });
    } catch (e) {
      customError(e.response.status);
    }
  };

  const onThumbnail = async (e) => {
    e.preventDefault();
    try {
      if (thumbnail) {
        setThumbnail();
        return;
      }
      const thumbnailData = document.createElement("input");
      thumbnailData.type = "file";
      thumbnailData.accept = "image/*";
      thumbnailData.onchange = (e) => {
        if (!thumbnailData.files) return;
        setThumbnail(thumbnailData.files[0]);
      };
      thumbnailData.click();
    } catch {}
  };

  return (
    <>
      <div css={PostWriterStyle}>
        <div className="body">
          <TextareaAutosize
            className="titleInputBox"
            placeholder="제목을 입력하세요"
            value={titleInput}
            onChange={onTitleChange}
          />
          <div className="divLine" />
          {data === undefined ? (
            <div>
              {thumbnail && (
                <img src={URL.createObjectURL(thumbnail)} alt="Thumb" />
              )}
            </div>
          ) : (
            <div>
              {thumbnail === undefined ? (
                <div>{data.thumbnail && <img src={data?.thumbnail} />}</div>
              ) : (
                <img src={URL.createObjectURL(thumbnail)} />
              )}
            </div>
          )}

          <TextareaAutosize
            className="contentInputBox"
            placeholder="당신의 이야기를 적어보세요..."
            value={contentInput}
            onChange={onContentChange}
          />
        </div>
        <div className="footer">
          <div className="footerLeft">
            <Link
              className="exitButton"
              to={data?.id ? `/read/${data.id}` : "/"}
              replace={true}
              state={data ? { data: data } : ""}
            >
              {" "}
              ⬅ 나가기{" "}
            </Link>
          </div>
          <div className="footerRight">
            {data === undefined ? (
              <button
                className="registerButton"
                disabled={false}
                onClick={onThumbnail}
              >
                {thumbnail ? "썸네일 취소" : "썸네일 등록"}
              </button>
            ) : (
              <button
                className="registerButton"
                disabled={false}
                onClick={onThumbnail}
              >
                {thumbnail ? "수정 취소" : "썸네일 수정"}
              </button>
            )}
            {data === undefined ? (
              <button
                className="registerButton"
                disabled={false}
                onClick={onSubmit}
              >
                등록하기
              </button>
            ) : (
              <button
                className="registerButton"
                disabled={false}
                onClick={onEdit}
              >
                수정하기
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostWriter;

const PostWriterStyle = css`
  width: 100%;
  padding: 1rem;
  background-color: white;

  .body {
    display: block;

    .divLine {
      width: 5rem;
      height: 0.5rem;
      margin: 2rem 0;
      border-radius: 0.1rem;
      background: #444444;
    }

    img {
      width: 100%;
    }

    .titleInputBox {
      background: none;

      width: 100%;
      min-height: 6.125rem;
      padding: 1rem 0;

      resize: none;
      outline: none;
      border: none;

      font-size: 3rem;
      font-weight: bold;

      line-height: 3rem;

      -ms-overflow-style: none;

      ::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }

      ::placeholder {
        color: #aaaaaa;
      }
    }

    .contentInputBox {
      background: none;

      width: 100%;
      min-height: 6.125rem;
      padding: 2rem 0;

      outline: none;
      border: none;
      resize: none;

      font-size: 1.5rem;
      line-height: 1.5rem;

      -ms-overflow-style: none;

      ::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }

      ::placeholder {
        color: #aaaaaa;
        font-style: italic;
      }
    }
  }

  .footer {
    background: none;
    width: 100%;
    height: 5rem;
    display: flex;
    .footerLeft {
      padding: 1rem;
      line-height: 3rem;

      .exitButton {
        border: none;
        outline: none;
        background: none;
        padding: 0;

        color: inherit;
        text-decoration: none;

        height: 3rem;
        width: 7rem;
        align-items: center;
        justify-content: center;
        font-size: 1.125rem;
        line-height: 1;
        cursor: pointer;
        font-weight: bold;
        border-radius: 0.5rem;
        letter-spacing: 0.0625em;

        &:hover:enabled {
        }

        &:disabled {
          cursor: default;
        }
      }
    }

    .footerRight {
      margin-left: auto;

      .thumbnailName {
        cursor: pointer;
      }

      .registerButton {
        margin: 1rem;
        border: none;
        outline: none;
        background: none;
        padding: 0;

        height: 3rem;
        width: 7rem;
        align-items: center;
        justify-content: center;
        font-size: 1.125rem;
        line-height: 1;
        color: black;
        cursor: pointer;
        font-weight: bold;
        border-radius: 0.5rem;
        letter-spacing: 0.0625em;

        &:hover:enabled {
        }

        &:disabled {
          cursor: default;
          // color:  white;
        }

        svg {
        }
      }
    }
  }
`;

// const rotateAnimation = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `

// const footerStyle = css`
// `

// const description = () => css`
//   color:  yellow;
//   font-size: 0.75rem;
//   margin-top: 0.5rem;
//   line-height: 1.5;

// `
