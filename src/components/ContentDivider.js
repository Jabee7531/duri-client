/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const ContentDivider = () => {
    return (
        <div css={ContentDividerStyle} />
    );
}

export default ContentDivider

const ContentDividerStyle = css`
    border-bottom: 1px solid;
    border-bottom-color: #C9C9C9;
`