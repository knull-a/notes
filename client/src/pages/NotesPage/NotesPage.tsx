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

const NotesPage = () => {
  async function fetchNotes<T>(name: string) {
    const { data } = await axios.get<{data: T}>(`http://localhost:3001/api/v1/${name}`);
    return data;
  };
  const notes = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes('notes')
  })

  const label = useQuery({
    queryKey: ['labels'],
    queryFn: () => fetchNotes('label')
  })


  // if (!notes.data) return <div>Нет данных</div>;

  console.log(notes)
  console.log(label)

  return (
    <>
      {/* <NotesList title="Pinned" notes={pinnedNotes} />
      <NotesList title="Other notes" notes={notes} /> */}
    </>
  );
};

export default NotesPage;
