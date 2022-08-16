import { useInfiniteQuery } from 'react-query'
import { searchPosts } from '../../lib/api/post/searchPost';


export default function useSearchPostsQuery(search, opt = {}) {
    return useInfiniteQuery(
        createKey(search),
        ({ pageParam = 1 }) =>
            searchPosts(pageParam, search),
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

const createKey = (search) => ['posts', 'search', search]