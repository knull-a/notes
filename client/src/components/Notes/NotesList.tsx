import type { Note } from "@/services/notes/types";

import classNames from "classnames";

import { useNavbarStore } from "@/stores/navbar";
import { Link, useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import { NotesButtonRow } from "./NotesButtonRow";
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRest } from "@/services";
import { mdiPin, mdiPinOutline } from "@mdi/js";
import { WithPage } from "@/services/types";

type Props = {
  notes?: Note[];
  title?: string;
  refetch: any;
};

export const NotesList = ({ notes, title, refetch }: Props) => {
  const { isColumn } = useNavbarStore();
  const noteClasses = (note: Note) =>
    classNames({
      "block break-inside border border-slightly-dark p-3 cursor-default break-all mb-6 notes rounded-lg transition-all relative":
        true,
      [`bg-[${note.color}]`]: note.color,
    });

  const queryClient = useQueryClient();

  const api = useRest();

  const { mutate: remove } = useMutation({
    mutationFn: async (id: string) => {
      return await api.notes.deleteNote(id);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const { mutate: edit } = useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.patchNote(newNote, newNote._id);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const location = useLocation();

  async function showColorChange(
    e: React.ChangeEvent<HTMLInputElement>,
    note: Note
  ) {
    setTimeout(() => {
      console.log("showColorChange", e.target.value);
      edit({ ...note, color: e.target.value });
    }, 2000);
  }

  async function changeImage(
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    note: Note
  ) {
    console.log("changeImage", note._id);
    e.preventDefault();
  }

  async function archiveNote(
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    note: Note
  ) {
    console.log("archiveImage", note._id);
    e.preventDefault();
    edit({ ...note, isArchived: !note.isArchived });
    await refetch();
  }

  async function deleteNote(
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    note: Note
  ) {
    e.preventDefault();
    console.log("deleteNote", note._id);
    remove(note._id);
    await refetch();
  }

  const containerClasses = (isPinned?: boolean) =>
    classNames({
      "gap-6 transition-all": true,
      "masonry-3": !isColumn,
      "mb-6": isPinned,
    });

  return notes ? (
    <div>
      {title && (
        <h2 className="uppercase text-sm ml-4 mb-2 font-medium text-gray-300">
          {title}
        </h2>
      )}
      <div className={containerClasses(true)}>
        {notes.map((note, idx) => (
          <Link
            to={`/notes/${note._id}`}
            className={noteClasses(note)}
            key={note._id + idx}
            state={{ previousLocation: location }}
          >
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
              note={note}
              functionsList={[
                showColorChange,
                changeImage,
                archiveNote,
                deleteNote,
              ]}
            />
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        List is empty
      </div>
    </>
  );
};
