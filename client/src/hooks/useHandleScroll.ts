import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import type { WithPage } from "@/services/types";
import type { Note } from "@/services/notes/types";

let hasReachedBottom = false;

export const useHandleScroll = async (
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<WithPage<Note[]>, unknown>>,
  beforeBottom = 100
) => {
  console.log("hasReachedBottom", hasReachedBottom);
  if (hasReachedBottom) {
    hasReachedBottom = false;
    return await fetchNextPage();
  }
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollBottom = Math.floor(scrollHeight - scrollTop);
  hasReachedBottom = scrollBottom - clientHeight < beforeBottom;
};
