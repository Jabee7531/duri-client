import client from "../client"

export async function updatePost(user_id, post_id, title, content, thumbnail) {
    const response = await client.patch("/post/update", {
        user_id: user_id,
        post_id: post_id,
        title: title,
        content: content,
        thumbnail_name: thumbnail
    })

    return response.data.result.post
}