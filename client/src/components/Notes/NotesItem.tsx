import Icon from "@mdi/react";
import {
  mdiArchiveArrowDownOutline,
  mdiDeleteOutline,
  mdiImageOutline,
  mdiPaletteOutline,
  mdiPin,
  mdiPinOutline,
} from "@mdi/js";
import classNames from "classnames";

import { Note } from "@/pages/NotesPage/NotesPage";
import { IconProps } from "@mdi/react/dist/IconProps";

type Props = {
  note: Note;
};

const NoteButton = ({ path, color }: IconProps) => (
  <button className="btn">
    <Icon path={path} color={color} size={1} />
  </button>
);

export const NotesItem = ({ note }: Props) => {
  const noteClasses = (note: Note) =>
    classNames({
      "break-inside border border-slightly-dark p-3 cursor-default break-all mb-6 notes rounded-lg transition-all relative":
        true,
      [`bg-[${note.color}]`]: note.color,
    });

  return (
    <div className={noteClasses(note)} key={note._id}>
      <div className="absolute top-3 right-3 opacity-0 transition-opacity buttons">
        <NoteButton path={note.isPinned ? mdiPin : mdiPinOutline} />
      </div>
      {note.image && (
        <img
          className="rounded-lg mb-2 max-w-sm m-auto"
          src={note.image}
          alt="Image"
        />
      )}
      <h3 className="mb-2 font-medium">{note.title}</h3>
      <p>{note.text}</p>
      <div className="buttons flex justify-center gap-10 mt-4 opacity-0 transition-opacity">
        <NoteButton path={mdiPaletteOutline} />
        <NoteButton path={mdiImageOutline} />
        <NoteButton path={mdiArchiveArrowDownOutline} />
        <NoteButton path={mdiDeleteOutline} />
      </div>
    </div>
  );
};
