import type { Note } from "@/services/notes/types";

import classNames from "classnames";

import { useNavbarStore } from "@/stores/navbar";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  useDeleteNote,
  useEditNote,
} from "@/services/notes/hooks/useMutateNote";
import { NotesItem } from "./NotesItem";

type Props = {
  notes?: Note[];
  title?: string;
  parentPage: string;
};

export const NotesList = ({ notes, title, parentPage }: Props) => {
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
            style={{ backgroundColor: note.color }}
            key={note._id + idx}
            state={{ previousLocation: location }}
          >
            <NotesItem note={note} />
          </Link>
        ))}
        <Outlet />
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
