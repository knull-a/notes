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
