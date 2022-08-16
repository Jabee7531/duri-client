import { useCallback } from "react"
import { useSetRecoilState } from "recoil"
import { globalDialogState } from "../atoms/globalDialogState"

export default function useCustomError() {
    const setDialogState = useSetRecoilState(globalDialogState)

    const customError = useCallback(
        (errorStatus) => {
            try {
                if (errorStatus === 401) {
                    setDialogState({ title: "로그인 에러", isOpen: true, message: "로그인을 하세요" })
                }
            } catch (e) {
                console.log("에러 발생", errorStatus)
            }
        }, [setDialogState]
    )
    return customError
}