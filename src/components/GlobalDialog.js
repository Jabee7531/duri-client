/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useRecoilState } from "recoil";
import { globalDialogState } from "../atoms/globalDialogState";

const GlobalDialog = () => {
    const [dialogState, setDialogState] = useRecoilState(globalDialogState)

    const onClose = async (e) => {
        e.preventDefault()
        try {
            setDialogState(false)
        } catch (e) {
        }

    }
    return (
        <>
            {dialogState.isOpen &&
                (
                    <>
                        <div css={Background}></div>
                        <div css={GlobalDialogStyle}>
                            <div css={whiteBox}>
                                <h3>{dialogState.title}</h3>
                                <p>{dialogState.message}</p>
                                <div css={button}>
                                    <button onClick={onClose}>close</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default GlobalDialog

const Background = css`
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    left: 0;
    top: 0;
    z-index: 10;

`

const GlobalDialogStyle = css`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;  
    left: 0;
    top: 0;
    z-index: 20;
`
const whiteBox = css`
    width: 380px;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0px 1rem 1rem rgba(67, 67, 67, 0.3);
`
const button = css`
    display: flex;
    justify-content: flex-end;
`
