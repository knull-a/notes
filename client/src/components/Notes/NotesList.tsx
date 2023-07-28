import React, { useEffect } from 'react';
import classNames from "classnames";

import { Note } from "@/pages/NotesPage/NotesPage";
import { useNavbarStore } from "@/stores/navbar";
import { NotesItem } from "./NotesItem";

type Props = {
  notes: Note[];
  title?: string;
};

export const NotesList = ({ notes, title }: Props) => {
  const { isColumn } = useNavbarStore();
  const containerClasses = (isPinned?: boolean) =>
    classNames({
      "gap-6 transition-all": true,
      "masonry-3": !isColumn,
      "mb-6": isPinned,
    });

  // for dynamic scroll. Executing twice so I should use 0.5 instead of 1
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop, scrollHeight, clientHeight)
    if (scrollHeight - scrollTop === clientHeight) {
      console.log('hello');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {title && (
        <h2 className="uppercase text-sm ml-4 mb-2 font-medium text-gray-300">
          {title}
        </h2>
      )}
      <div className={containerClasses(true)}>
        {notes.map((filteredNote) => (
          <NotesItem key={filteredNote._id} note={filteredNote} />
        ))}
      </div>
    </div>
  );
};
