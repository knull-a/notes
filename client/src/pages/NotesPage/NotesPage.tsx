import { useEffect } from "react";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import "./NotesPage.css";
import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotesList } from "@/components/Notes/NotesList";

type Label = {
  _id: string;
  title: string;
  notes: string[];
};

export type Note = {
  _id: string;
  title: string;
  text: string;
  image: string;
  color: string;
  labels: Label[];
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
};

export type WithPage<T> = {
  data: T;
  paging: {
    total: number;
    pages: number;
    currentPage: number;
    pageSize: number;
  };
};

const NotesPage = () => {
  async function fetchNotes<T>(name: string, page = 1) {
    const { data } = await axios.get<T>(
      `http://localhost:3001/api/v1/${name}`,
      { params: { page } }
    );
    return data;
  }
  async function fetchPageable<T>(name: string, page = 1) {
    const { data } = await axios.get<WithPage<T>>(
      `http://localhost:3001/api/v1/${name}`,
      { params: { page } }
    );
    return data;
  }
  const {
    data: pinnedNotes,
    isLoading: isPinnedLoading,
    isError: hasPinnedError,
  } = useQuery(["pinned"], () => fetchNotes<Note[]>("pinned"));

  const {
    data: notes,
    fetchNextPage,
    isLoading: isNotesLoading,
    isError: hasNotesError,
  } = useInfiniteQuery(
    ["notes"],
    ({ pageParam = 1 }) => fetchPageable<Note[]>("notes", pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.paging.currentPage < lastPage.paging.pages)
          return lastPage.paging.currentPage + 1;
        else return undefined;
      },
    }
  );

  const handleScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollBottom = Math.floor(scrollHeight - scrollTop)
    const beforeBottom = 200
    const hasReachedBottom = (scrollBottom - clientHeight) < beforeBottom
    if (hasReachedBottom) {
      await fetchNextPage();
      console.log(notes);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // if () return <div>No data</div>;

  if (isNotesLoading || isPinnedLoading) return <div><CustomLoader /></div>;

  if (hasNotesError) return <div>Query Notes error</div>;

  if (isPinnedLoading) return <div>Query Pinned Loading</div>;

  if (hasPinnedError) return <div>Query Pinned error</div>;

  console.log(notes);
  console.log(pinnedNotes);

  return (
    <>
      <NotesList title="Pinned" notes={pinnedNotes} />
      <NotesList title="Other notes" notes={notes.pages.map(page => page.data).flat()} />
    </>
  );
};

export default NotesPage;
