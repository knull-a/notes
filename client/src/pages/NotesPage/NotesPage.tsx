import { useState, useEffect } from "react";
import axios from "axios";

import "./NotesPage.css";
import { NotesList } from "@/components/Notes/NotesList";
import { useQuery } from "@tanstack/react-query";

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
  data: T
  paging: {
    total: number
    pages: number
    currentPage: number
    pageSize: number
  }
}

const NotesPage = () => {
  async function fetchNotes<T>(name: string) {
    const { data } = await axios.get<T>(
      `http://localhost:3001/api/v1/${name}`
    );
    return data;
  }
  const {data: notes, isLoading: isNotesLoading, isError: hasNotesError} = useQuery(["notes"], () => fetchNotes<WithPage<Note[]>>("notes"));

  const {data: pinnedNotes, isLoading: isPinnedLoading, isError: hasPinnedError} = useQuery(["pinned"], () => fetchNotes<Note[]>("pinned"));

  // if () return <div>No data</div>;

  if (isNotesLoading) return <div>Query Notes Loading</div>
  
  if (hasNotesError) return <div>Query Notes error</div>

  if (isPinnedLoading) return <div>Query Pinned Loading</div>
  
  if (hasPinnedError) return <div>Query Pinned error</div>

  console.log(notes.data);
  console.log(pinnedNotes)

  return (
    <>
      <NotesList title="Pinned" notes={pinnedNotes} />
      <NotesList title="Other notes" notes={notes.data} />
    </>
  );
};

export default NotesPage;
