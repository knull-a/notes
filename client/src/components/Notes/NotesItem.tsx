import { Note } from "@/services/notes/types";
import { mdiPin, mdiPinOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { CustomInput } from "../Custom/CustomInput";

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
      {note.labels && (
        <div className="flex mt-2">
          {note.labels.map((label) => (
            <div
              className="border border-slightly-dark rounded-2xl py-1 px-4"
              key={label._id}
            >
              <div>{label.title}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
