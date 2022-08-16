/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { dog } from "../static";
import RegisterForm from "./form/RegisterForm";

const Register = () => {
  return (
    <div css={RegisterStyle}>
      <div className="whiteBox">
        <h1>회원가입 !</h1>
        <img src={dog} alt="welcome" />
        <h2>닉네임을 입력하세요</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register

const RegisterStyle = css`
    display: flex;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(111.85deg, #00acc1 0%, #22747e 94.6%);
    align-items: center;
    justify-content: center;

    .whiteBox{
      background: white;
      width: 30rem;
      padding: 2rem;
      border-radius: 2rem;
      box-shadow: 0px 1rem 1rem 0.25rem rgb(0 68 77 / 16%);
      h1 {
        margin: 0;
        font-size: 3rem;
      }
      h2 {
        text-indent: 0.2rem;
        font-size: 1rem;
        font-weight: 500;
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-weight: normal;
      }
      img {
        display: block;
        margin-top: 3rem;
        margin-bottom: 2rem;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
      }
    }
`