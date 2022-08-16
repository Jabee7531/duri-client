/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo, useRef } from "react";
import useReadPostsQuery from "../hooks/query/useReadPostsQuery";
import media from "../lib/media";
import PostGridItem from "./PostGridItem";
import PostGridItemSkeleton from "./PostGridItemSkeleton";

const PostGrid = () => {
  const { data, hasNextPage, fetchNextPage } = useReadPostsQuery();
  const ref = useRef(null);

  const items = useMemo(() => {
    if (!data) return null;
    const items = [];
    data.pages.map((x, i) => items.push(x["posts"].flat()));
    return items.flat();
  }, [data]);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach((entries) => {
          if (entries.isIntersecting) {
            fetchNextPage();
          }
        });
      }),
    [fetchNextPage]
  );

  useEffect(() => {
    if (!items) return;
    if (!ref.current) return;
    const el = ref.current;
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [observer, items]);

  return (
    <div css={PostGridStyle}>
      {items
        ? items.map((item) => <PostGridItem key={item.id} post={item} />)
        : Array.from({ length: 10 }).map((_, i) => (
            <PostGridItemSkeleton key={i} />
          ))}
      {hasNextPage &&
        Array.from({ length: 10 }).map((_, i) => (
          <PostGridItemSkeleton key={i} ref={i === 0 ? ref : undefined} />
        ))}
    </div>
  );
};

export default PostGrid;

const PostGridStyle = css`
  display: grid;
  gap: 1.25rem 1.25rem;
  grid-template-columns: repeat(2, 1fr);

  ${media.xsmall} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
