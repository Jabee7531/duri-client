import client from "../client"

export async function searchPosts(cursor, search) {
    const response = await client.get('/post/search', {
        params: {
            cursor: cursor,
            search: search,
        }
    })

    return response.data.result
}