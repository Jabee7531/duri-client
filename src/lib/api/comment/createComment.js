import client from "../client"

export async function createComment(user_id, post_id, content, level, reply_to) {
    const response = await client.post("/post/comment/create", {
        user_id: user_id,
        post_id: post_id,
        content: content,
        level: level,
        reply_to: reply_to,
    })

    return response.data.post
}