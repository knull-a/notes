import type { Note } from "@/services/notes/types";

import classNames from "classnames";

import { useNavbarStore } from "@/stores/navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import {
  useDeleteNote,
  useEditNote,
} from "@/services/notes/hooks/useMutateNote";
import { NotesItem } from "./NotesItem";

type Props = {
  notes?: Note[];
  title?: string;
  refetch: any;
  parentPage: string;
};

export const NotesList = ({ notes, title, parentPage, refetch }: Props) => {
  const { isColumn } = useNavbarStore();
  const navigate = useNavigate()
  const location = useLocation();

  const containerClasses = (isPinned?: boolean) =>
    classNames({
      "gap-6 transition-all": true,
      "masonry-3": !isColumn,
      "mb-6": isPinned,
    });

  const { mutate: remove } = useDeleteNote();
  const { mutate: edit } = useEditNote();


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
            to={`/${parentPage}/${note._id}`}
            className="block break-inside border border-slightly-dark p-3 cursor-default break-all mb-6 notes rounded-lg transition-all relative"
            style={{ backgroundColor: `${note.color}` }}
            key={note._id + idx}
            state={{ previousLocation: location }}
          >
            <NotesItem note={note} />
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
