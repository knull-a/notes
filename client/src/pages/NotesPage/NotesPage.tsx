import { useState, useEffect } from "react";
import axios from "axios";

import "./NotesPage.css";
import { NotesList } from "@/components/Notes/NotesList";

type Label = {
  _id: string
  title: string
  notes: string[]
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
  const [notes, setNotes] = useState<Note[]>([]);
  const [pinnedNotes, setPinnedNotes] = useState<Note[]>([]);

  const fetchData = async () => {
    const { data: allNotes } = await axios.get(
      "http://localhost:3001/api/v1/notes"
    );
    const { data: allPinnedNotes } = await axios.get(
      "http://localhost:3001/api/v1/pinned"
    );
    setNotes(allNotes);
    setPinnedNotes(allPinnedNotes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!notes.length) return <div>Нет данных</div>;

  return (
    <>
      <NotesList title="Pinned" notes={pinnedNotes} />
      <NotesList title="Other notes" notes={notes} />
    </>
  );
};

export default NotesPage;
