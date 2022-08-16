import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { googleTokenState } from '../atoms/authState'
import { checkGoogleRegistered } from '../lib/api/oauth/checkGoogleRegistered'
import { googleSignin } from '../lib/api/oauth/googleSignin'
import useAuth from './useAuth'

export default function useGoogleSignin() {
    const [, setGoogelToken] = useRecoilState(googleTokenState)
    const { authorize } = useAuth()
    const navigate = useNavigate()

    const signin = useCallback(
        async (access_token) => {
            try {
                setGoogelToken(access_token)
                const exists = await checkGoogleRegistered(access_token)
                if (exists) {
                    const user = await googleSignin(access_token)
                    authorize(user["user"])
                } else {
                    navigate('/regist')
                }
            } catch (e) {
                console.log('구글 로그인 실패')
            }
        }, [setGoogelToken, authorize, navigate]
    )
    return signin
}