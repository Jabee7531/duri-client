import { useRecoilState } from "recoil"
import { userState } from "../atoms/authState"
import { googleLogout } from "../lib/api/oauth/googleLogout"
import userStorage from "../lib/storage/userStorage"
import useCustomError from "./useCustomError"

export default function useAuth() {
    const [, setUserSate] = useRecoilState(userState)
    const customError = useCustomError()
    const authorize = (user) => {
        setUserSate(user)
        userStorage.set(user)
    }
    const logout = () => {
        setUserSate(null)
        userStorage.clear()
        try {
            const auth2 = window.gapi.auth2.getAuthInstance()
            auth2.signOut()
            googleLogout()
        } catch (e) {
            customError(e.response.status)
        }
    }

    return { authorize, logout }
}