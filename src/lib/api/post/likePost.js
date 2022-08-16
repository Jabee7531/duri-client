import client from "../client"

export async function likePost(user_id, post_id) {
    const response = await client.post("/post/like/create", {
        user_id: user_id,
        post_id: post_id,
    })

    return response.data.result
}