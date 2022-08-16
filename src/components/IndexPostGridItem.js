/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const IndexPostGridItem = () => {
    return (
        <div css={IndexPostGridItemStyle}>
            <div className="thumbnail"> 썸네일 </div>
            <div className="title">  제목 </div>
            <div className="info">  정보 </div>
        </div>
    );
}

export default IndexPostGridItem

const IndexPostGridItemStyle = css`
    display: flex;
    flex-direction: column;
    width: 10rem;
    background-color: red;
    margin: 1rem;

    .thumbnail{
        height: 70%;
    }

    .title{
        height: 15%;
    }

    .info{
        height: 15%;
    }
`
const gridContnet = css`
`