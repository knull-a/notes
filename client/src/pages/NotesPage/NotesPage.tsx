import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { useRest } from "@/services";
import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotesList } from "@/components/Notes/NotesList";
import { NotesForm } from "@/components/Notes/NotesForm";

import "./NotesPage.css";

const NotesPage = () => {
  const api = useRest();

  const {
    data: pinnedNotes,
    isLoading: isPinnedLoading,
    isError: hasPinnedError,
  } = useQuery(["pinned"], async () => await api.pinned.getPinnedNotes());

  const {
    data: notes,
    fetchNextPage,
    isLoading: isNotesLoading,
    isError: hasNotesError,
  } = useInfiniteQuery(
    ["notes"],
    async ({ pageParam = 1 }) => await api.notes.getNotes({ page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.paging.currentPage < lastPage.paging.pages)
          return lastPage.paging.currentPage + 1;
        else return undefined;
      },
      keepPreviousData: true,
    }
  );

  const handleScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollBottom = Math.floor(scrollHeight - scrollTop);
    const beforeBottom = 200;
    const hasReachedBottom = scrollBottom - clientHeight < beforeBottom;

    if (hasReachedBottom) {
      await fetchNextPage();
      console.log(notes);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isNotesLoading || isPinnedLoading)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (hasNotesError || hasPinnedError) return <div>Query error</div>;

  console.log(notes);
  console.log(pinnedNotes);

  return (
    <>
      <NotesForm />
      <NotesList title="Pinned" notes={pinnedNotes} />
      <NotesList
        title="Other notes"
        notes={notes.pages.map((page) => page.data).flat()}
      />
    </>
  );
};

export default NotesPage;
