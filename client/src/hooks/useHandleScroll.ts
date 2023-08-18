import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import type { WithPage } from "@/services/types";
import type { Note } from "@/services/notes/types";

export const useHandleScroll = async (
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<WithPage<Note[]>, unknown>>,
  beforeBottom = 200
) => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollBottom = Math.floor(scrollHeight - scrollTop);
  const hasReachedBottom = scrollBottom - clientHeight < beforeBottom;

  if (hasReachedBottom) await fetchNextPage();
};
