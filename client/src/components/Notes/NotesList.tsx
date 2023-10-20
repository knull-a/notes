import type { Note } from "@/services/notes/types";

import classNames from "classnames";

import { useNavbarStore } from "@/stores/navbar";
import { Link, Outlet, useLocation } from "react-router-dom";

import { NotesItem } from "./NotesItem";
import useModalStore from "@/stores/modal";

type Props = {
  notes?: Note[];
  title?: string;
  parentPage: string;
};

export const NotesList = ({ notes, title, parentPage }: Props) => {
  const { isColumn } = useNavbarStore();
  const location = useLocation();
  const { isOpened, toggleModal } = useModalStore();

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
            to={`/${parentPage}/${note._id}`}
            className="block break-inside border border-slightly-dark p-3 cursor-default break-all mb-6 notes rounded-lg transition-all relative"
            style={{ backgroundColor: note.color }}
            key={note._id + idx}
            state={{ previousLocation: location }}
            onClick={() => toggleModal(true)}
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
