import client from '../client'

export async function googleSignup(accessToken, nickname) {
    const response = await client.post(
        '/user/oauth/signup',
        {
            access_token: accessToken,
            nickname: nickname,
        }
    )
    return response.data
}
