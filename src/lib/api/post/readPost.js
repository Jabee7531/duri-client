import client from "../client"

export async function readPost(post_id) {
    const response = await client.get("/post/read", {
        params: {
            post_id: post_id
        }
    })

    return response.data.result.post
}