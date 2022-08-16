import client from '../client'

export async function googleLogout() {
    const response = await client.post(
        '/user/oauth/logout',
        {
        }
    )
    return response.data
}
