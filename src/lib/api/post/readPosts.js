import client from "../client"

export async function readPosts(cursor) {
    const response = await client.get('/post/all', {
        params: {
            cursor: cursor
        }
    })

    return response.data.result
}