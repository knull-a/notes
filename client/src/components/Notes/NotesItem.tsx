import { Note } from "@/services/notes/types";
import useModalStore from "@/stores/modal";
import { mdiPin, mdiPinOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {
  note: Note;
};


export const NotesItem = ({ note }: Props) => {
  return (
    <>
      <div className="absolute top-3 right-3 opacity-0 transition-opacity buttons">
        <button className="btn">
          <Icon path={note.isPinned ? mdiPin : mdiPinOutline} />
        </button>
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
