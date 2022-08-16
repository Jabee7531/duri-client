/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import palette from "../lib/palette";
import SlickCarousel from "./SlickCarousel";

const IndexPostGrid = ({ title, slides, rest_settings }) => {
    return (
        <div css={IndexPostGridStyle}>
            <div css={gridTitle}>
                <div className="indexPostGridTitle">
                    {title}
                </div>
                <div className="indexPostGridTools">
                    +더보기
                </div>
            </div>
            <div css={gridContnet}>
                <SlickCarousel slides={slides} rest_settings={rest_settings} />
            </div>
        </div>
    );
}

export default IndexPostGrid

const IndexPostGridStyle = css`
    display: flex;
    flex-direction: column;
    background-color: ${palette.white};

    height: 20rem;
    
    margin-top: 0.5rem;
`

const gridTitle = css`
    display: flex;
    height: 3rem;
    justify-content: space-between;

    font-size: 1.2rem;
    font-weight: bold;
    padding: 0 1rem;

    cursor: grab;

    .indexPostGridTitle{
        margin: auto 0;
    }

    .indexPostGridTools{
        margin: auto 0;
    }
`

const gridContnet = css`
    display: flex;
    height: 17rem;
`