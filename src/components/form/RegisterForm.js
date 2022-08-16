/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useState } from "react";
import useCustomError from "../../hooks/useCustomError";
import useGoogleSignup from "../../hooks/useGoogleSignup";
import { SearchIcon } from "../../static";

const RegisterForm = () => {
  const customError = useCustomError();
  const [nickname, setNickname] = useState("");
  const onChange = (e) => setNickname(e.target.value);
  const { signup, loading, error } = useGoogleSignup();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(nickname);
    } catch (e) {
      setNickname("");
    }
  };
  return (
    <form css={RegisterFormStyle} onSubmit={onSubmit}>
      <input placeholder="닉네임" value={nickname} onChange={onChange} />
      <div css={description(true)}>2 ~ 10 글자를 입력하세요</div>
      {error && <div css={description(true, true)}>{error}</div>}
      <button disabled={loading}>
        {loading ? <SearchIcon /> : "REGISTER"}
      </button>
      <div css={description(false)}>
        By signing up, I accept to Terms of Use. I have read and understood the
        Privacy Policy and Cookies Policy
      </div>
    </form>
  );
};

export default RegisterForm;

const rotateAnimation = keyframes`
  from {
    /* -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg); */
    transform: rotate(0deg);
  }
  to {
    /* -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg); */
    transform: rotate(360deg);
  }
`;

const RegisterFormStyle = css`
  input {
    height: 3rem;
    width: 100%;
    border: black 1px solid;
    border-radius: 0.25rem;
    font-size: 1.25rem;
    text-indent: 0.2rem;
  }

  button {
    display: flex;
    background: blue;
    height: 3rem;
    width: 100%;

    padding: 0;
    margin-top: 2rem;
    margin-bottom: 1rem;

    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 0.5rem;
    outline: none;

    font-size: 1.125rem;
    font-weight: bold;
    letter-spacing: 0.0625em;
    line-height: 1;
    color: white;
    cursor: pointer;

    &:hover:enabled {
      background: blue;
    }

    &:disabled {
      cursor: default;
      color: blue;
      color: gray;
    }

    svg {
      animation: ${rotateAnimation} 1.2s linear infinite;
    }
  }
`;

const description = (alignRight, error) => css`
  color: blue;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  line-height: 1.5;
  ${alignRight &&
  css`
    text-align: right;
  `}

  ${error &&
  css`
    margin-top: 0;
    color: red;
  `}
`;
