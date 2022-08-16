/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import useSearchPostsQuery from "../hooks/query/useSearchQuery";
import SearchResultForm from "./form/SearchResultForm";

// TODO: 검색 구현
const PostSearch = () => {
  const location = useLocation();
  const searchInput = location.state?.searchInput

  const { data, hasNextPage, fetchNextPage } = useSearchPostsQuery(searchInput)
  const ref = useRef(null)
  const items = useMemo(() => {
    if (!data) return null
    const items = []
    data.pages.map((x, i) => (
      items.push(x["posts"].flat())
    ))
    return items.flat()
  }, [data])

  const observer = useMemo(() =>
    new IntersectionObserver((entries) => {
      entries.forEach((entries) => {
        if (entries.isIntersecting) {
          fetchNextPage()
        }
      })
    }),
    [fetchNextPage]
  )

  useEffect(() => {
    if (!items) return
    if (!ref.current) return
    const el = ref.current
    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [observer, items])


  return (
    <div css={PostSearchStyle}>
      <div className="header">
        총 <b>{data?.pages[0].count}개의</b> 포스트를 찾았습니다
      </div>
      <div>
        {items ?
          items.map((item) => (
            <div key={item.id}>
              <SearchResultForm post={item} />
            </div>
          ))
          : <div>loding</div>
        }
        {hasNextPage &&
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} ref={i === 0 ? ref : undefined}>loding</div>
          ))
        }
      </div>
    </div>
  );
}

export default PostSearch

const PostSearchStyle = css`
  display: flex;
  flex-direction: column;

  ::before{
  }
`