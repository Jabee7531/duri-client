import client from "../client"

export async function createPost(user_id, title, content, thumbnailName) {
    const response = await client.post("/post/create", {
        user_id: user_id,
        title: title,
        content: content,
        thumbnail_name: thumbnailName,
    })

    return response.data.result.post
}