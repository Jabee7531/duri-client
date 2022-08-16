import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { googleTokenState } from "../atoms/authState";
import { googleSignin } from "../lib/api/oauth/googleSignin";
import { googleSignup } from "../lib/api/oauth/googleSignup";
import useAuth from "./useAuth";


export default function useGoogleSignup() {
    const { authorize } = useAuth()
    const [googleToken] = useRecoilState(googleTokenState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const signup = async (nickname) => {
        setLoading(true)
        try {
            await googleSignup(googleToken, nickname)
            const user = await googleSignin(googleToken)
            authorize(user["user"])
            navigate('/')
        } catch (e) {
            if (e.response.status === 409) {
                setError('닉네임이 이미 존재합니다')
                throw e
            }
        } finally {
            setLoading(false)
        }
    }
    return {
        signup,
        loading,
        error
    }
}