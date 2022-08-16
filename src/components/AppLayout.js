/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { Outlet } from "react-router-dom";
import media from "../lib/media";
import palette from "../lib/palette";
import FloatingHeader from "./FloatingHeader";
import GlobalDialog from "./GlobalDialog";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div css={AppLayoutStyle}>
      <Global styles={globalStyle} />
      <GlobalDialog />
      <Outlet />
    </div>
  );
};

const HeaderLayout = () => {
  return (
    <>
      <div css={headerLayoutStyle}>
        <Header />
      </div>
      <Outlet />
    </>
  );
};
const FloatingHeaderLayout = () => {
  return (
    <>
      <div css={FloatingHeaderLayoutStyle}>
        <FloatingHeader />
      </div>
      <Outlet />
    </>
  );
};

const Main = () => {
  return (
    <div css={MainStyle}>
      <Outlet />
    </div>
  );
};

const Main2 = () => {
  return (
    <div css={Main2Style}>
      <Outlet />
    </div>
  );
};

AppLayout.Main = Main;
AppLayout.Main2 = Main2;
AppLayout.HeaderLayout = HeaderLayout;
AppLayout.FloatingHeaderLayout = FloatingHeaderLayout;

export default AppLayout;

const globalStyle = css`
  html,
  body,
  #root {
    height: 100%;
    background: ${palette.grey["100"]};
    font-family: "NotoSerif";

    ::-webkit-scrollbar {
      display: none !important;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  html {
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }
`;

const AppLayoutStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const headerLayoutStyle = css`
  position: fixed;
  width: 100%;
  height: 6rem;
  background-color: ${palette.white};
  z-index: 1;
  top: 0;
`;

const FloatingHeaderLayoutStyle = css`
  position: fixed;
  width: 100%;
  height: 4rem;
  background-color: ${palette.white};
  border-bottom: 1px solid #dfdfdf;
  z-index: 1;
  top: 6rem;
`;

const MainStyle = css`
  width: 70%;
  max-width: 768px;
  padding-top: 10.5rem;

  ${media.small} {
    width: 100%;
  }
`;

const Main2Style = css`
  ${MainStyle}
  padding-top: 6.5rem;
`;
