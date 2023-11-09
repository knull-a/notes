import { Note } from "@/services/notes/types";
import { createElement } from "react";
import { Link } from "react-router-dom";

type LabelElement = typeof Link | "div";

type Props = {
  as?: LabelElement;
  note: Note;
};

export const NotesLabels = ({ note, as = "div" }: Props) => {
  return (
    note.labels && (
      <div className="flex -mt-2 mb-1 ">
        {note.labels.map((label, idx) =>
          createElement(
            as,
            {
              key: label._id + idx,
              className: "border border-slightly-dark rounded-2xl py-1 px-4",
              to: `/notes?name=${label.title}&label=${label._id}`,
            },
            <div>{label.title}</div>
          )
        )}
      </div>
    )
  );
};
