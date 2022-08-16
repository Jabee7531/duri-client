import client from '../client'

export async function checkGoogleRegistered(access_token) {
    const response = await client.post(
        '/user/oauth/check',
        {
            access_token: access_token,
        }
    )
    return response.data.result.exists
}