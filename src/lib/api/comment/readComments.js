import client from "../client"

export async function readComments(post_id, level, reply_to) {
    const response = await client.get('/post/comment/all', {
        params: {
            post_id: post_id,
            level: level,
            reply_to: reply_to,
        }
    })

    return response.data.result
}