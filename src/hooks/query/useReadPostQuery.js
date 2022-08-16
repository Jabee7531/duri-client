import { useQuery } from "react-query";
import { readPost } from "../../lib/api/post/readPost";

export default function useReadPostQuery(post_id) {
    return useQuery(createKey(post_id), () => readPost(post_id))
}

const createKey = (post_id) => ['post', post_id]