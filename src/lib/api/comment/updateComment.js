import client from "../client"

export async function updateComment(user_id, comment_id, content, level) {
    const response = await client.patch("/post/comment/update", {
        user_id: user_id,
        comment_id: comment_id,
        content: content,
        level: level,
    })

    return response.data.result.post
}