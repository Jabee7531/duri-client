/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCallback, useEffect, useRef } from "react";
import useGoogleSignin from "../../hooks/useGoogleSignin";

const LoginButton = () => {
  const signin = useGoogleSignin();
  const buttonRef = useRef(null);
  const onSuccess = useCallback(
    (googleUser) => {
      signin(googleUser.getAuthResponse(true).access_token);
    },
    [signin]
  );
  const onFailure = useCallback((e) => {}, []);
  useEffect(() => {
    window.gapi.load("auth2", function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      const auth2 = window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_AUTH_KEY,
        cookiepolicy: "single_host_origin",
        plugin_name: "Dori",
      });
      auth2.attachClickHandler(
        buttonRef.current,
        {},
        (googleUser) => {
          onSuccess(googleUser);
        },
        onFailure
      );
    });
  }, [onSuccess, onFailure]);

  return (
    <button css={LoginButtonStyle} ref={buttonRef}>
      로그인
    </button>
  );
};

export default LoginButton;

const LoginButtonStyle = css`
  background: black;
  display: inline-flex;

  align-items: center;
  justify-content: space-around;

  height: 2.4rem;
  width: 5.5rem;

  border: 1px solid;
  border-radius: 2.4rem;
  color: yellow;
  cursor: pointer;

  font-size: 1rem;
  font-weight: bold;
  color: white;
  letter-spacing: 0.08rem;
  transition: all ease-in 0.125s;
  &:hover {
    box-shadow: 0px 0.25rem 0.5rem rgb(0 0 0 / 11%);
  }
`;
