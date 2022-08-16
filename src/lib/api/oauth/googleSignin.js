import client from '../client'

export async function googleSignin(access_token) {
    const response = await client.post(
        '/user/oauth/signin',
        {
            access_token: access_token,
        }
    )
    return response.data.result
}
