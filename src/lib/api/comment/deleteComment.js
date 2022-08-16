import client from "../client"

export async function deleteComment(user_id, comment_id) {
    const response = await client.delete("/post/comment/delete", {
        headers: {
        },
        data: {
            user_id: user_id,
            comment_id: comment_id,
        }
    })

    return response.data.result
}