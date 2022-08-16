import client from "../client"

export async function deletePost(user_id, post_id) {
    const response = await client.delete("/post/delete", {
        headers: {
        },
        data: {
            user_id: user_id,
            post_id: post_id,
        }
    })

    return response.data.result
}