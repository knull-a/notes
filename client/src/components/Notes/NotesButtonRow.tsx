import {
  mdiPaletteOutline,
  mdiImageOutline,
  mdiArchiveArrowDownOutline,
  mdiDeleteOutline,
} from "@mdi/js";
import classNames from "classnames";

import Icon from "@mdi/react";
import { Note } from "@/services/notes/types";
import { UseFormRegister } from "react-hook-form";
import {
  useDeleteNote,
  useEditNote,
} from "@/services/notes/hooks/useMutateNote";
import { useState } from "react";

type Props = {
  isCreated?: boolean;
  functionsList?: any[];
  note: Note;
  register?: UseFormRegister<any>; // temp
};

export const NotesButtonRow = ({
  isCreated,
  functionsList,
  note,
  register,
}: Props) => {
  const [colorValue, setColorValue] = useState("inherit");

  const rowClasses = classNames({
    "buttons flex justify-center gap-6 mt-auto transition-opacity": true,
    "opacity-0": isCreated,
  });

  const { mutate: remove } = useDeleteNote();
  const { mutate: edit } = useEditNote();

  const labelList = [
    {
      id: 1,
      path: mdiImageOutline,
    },
    {
      id: 2,
      path: mdiArchiveArrowDownOutline,
    },
    {
      id: 3,
      path: mdiDeleteOutline,
    },
  ];

  const mergedLabelList = labelList.map((item, index) => {
    return {
      ...item,
      func: functionsList && functionsList[index],
    };
  });

  return (
    <>
      {mergedLabelList.map((label) => (
        <button
          type="button"
          className="btn"
          key={label.id}
          onClick={(e) => label.func && label.func(e, note)}
        >
          <Icon path={label.path} size={1} />
        </button>
      ))}
    </>
  );
};
