import { useInfiniteQuery } from 'react-query'
import { readPosts } from '../../lib/api/post/readPosts'


export default function useReadPostsQuery(opt = {}) {
    return useInfiniteQuery(
        createKey(),
        ({ pageParam = 1 }) =>
            readPosts(pageParam),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.has_next) {
                    return Number(lastPage.page) + 1;
                }
                return undefined;
            }
        },
        opt
    )
}

const createKey = () => ['posts', 'public']