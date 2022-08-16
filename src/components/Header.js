/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/authState";
import useAuth from "../hooks/useAuth";
import media from "../lib/media";
import palette from "../lib/palette";
import { logo, iconSearch } from "../static";
import LoginButton from "./button/LoginButton";

const Header = () => {
  const user = useRecoilValue(userState);
  const { logout } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const onSearchChange = (e) => setSearchInput(e.target.value);

  return (
    <div css={HeaderStyle}>
      <div css={headerContent}>
        <Link css={logoStyle} to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <div css={toolBoxStyle}>
          <div css={searchBox}>
            <input
              placeholder="검색어를 입력하세요"
              value={searchInput}
              onChange={onSearchChange}
            />
            <Link to={"/search"} state={{ searchInput: searchInput }}>
              <img src={iconSearch} alt="iconSearch" />
            </Link>
          </div>
          {user ? (
            <div css={userCard} onClick={logout}>
              {user.nickname}
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  );
};

const headerContent = css`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  max-width: 768px;

  ${media.small} {
    width: 100%;
    margin: 0 1rem;
  }
`;
const userCard = css`
  color: ${palette.grey["600"]};
`;

const searchBox = css`
  display: flex;
  width: 10rem;
  height: 2rem;

  padding: 0 0.5rem;
  margin-right: 1rem;
  border: 1px solid ${palette.grey["500"]};
  border-radius: 1rem;

  input {
    width: 100%;
    background: none;
    border: none;
    outline: none;
  }
  a {
    display: flex;
    width: 1rem;
    justify-items: center;
    align-items: center;
  }
  img {
    width: 100%;
  }
`;

const HeaderStyle = css`
  display: flex;
  height: 100%;
  justify-content: center;
`;
const logoStyle = css`
  height: 4.5rem;
  img {
    height: 100%;
  }
`;

const toolBoxStyle = css`
  display: inline-flex;
  font-size: 1.3em;
  align-items: center;

  div {
    font-weight: bold;
  }
`;

export default Header;
