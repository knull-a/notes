import type { Note } from "@/services/notes/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mdiPin, mdiPinOutline } from "@mdi/js";

import classNames from "classnames";

import { NotesButtonRow } from "./NotesButtonRow";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { useRest } from "@/services";

type Props = {
  note: Note;
};

export const NotesItem = ({ note }: Props) => {
  const noteClasses = (note: Note) =>
    classNames({
      "block break-inside border border-slightly-dark p-3 cursor-default break-all mb-6 notes rounded-lg transition-all relative":
        true,
      [`bg-[${note.color}]`]: note.color,
    });

  const queryClient = useQueryClient();

  const api = useRest();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await api.pinned.deletePinnedNote(id);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const showColorChange = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    console.log("showColorChange", note._id);
    e.preventDefault();
  };

  const changeImage = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    console.log("changeImage", note._id);
    e.preventDefault();
  };

  const archiveNote = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    console.log("archiveImage", note._id);
    e.preventDefault();
  };

  const deleteNote = async (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("deleteNote", note._id);
    mutate(note._id);
    await api.notes.getNotes({ page: 1 });
  };

  return (
    <Link to={`/${note._id}`} className={noteClasses(note)} key={note._id}>
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
      <NotesButtonRow
        isCreated
        functionsList={[showColorChange, changeImage, archiveNote, deleteNote]}
      />
    </Link>
  );
};
