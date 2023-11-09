import { Note } from "@/services/notes/types";
import { CustomInput } from "../Custom/CustomInput";
import { NotesLabels } from "./NotesLabels";

type Props = {
  note: Note;
};

export const NotesItem = ({ note }: Props) => {
  return (
    <>
      {note.image && (
        <img
          className="rounded-lg mb-2 max-w-sm m-auto"
          src={String(note.image)}
          alt="Image"
        />
      )}
      <h3 className="mb-2 font-medium">{note.title}</h3>
      <CustomInput disabled name="text" as="textarea" value={note.text} />
      <NotesLabels note={note} />
    </>
  );
};
