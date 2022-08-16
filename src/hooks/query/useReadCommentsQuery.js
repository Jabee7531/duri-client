import { useQuery } from "react-query";
import { readComments } from "../../lib/api/comment/readComments";

export default function useReadCommentsQuery(post_id, level, reply_to) {
    return useQuery(createKey(post_id, level, reply_to), () => readComments(post_id, level, reply_to))
}

const createKey = (post_id, level, reply_to) => ['comments', post_id, level, reply_to]