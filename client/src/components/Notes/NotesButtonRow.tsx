import {
  mdiImageOutline,
  mdiArchiveArrowDownOutline,
  mdiDeleteOutline,
} from "@mdi/js";

import Icon from "@mdi/react";
import { Note } from "@/services/notes/types";
import { UseFormRegister } from "react-hook-form";

type Props = {
  isCreated?: boolean;
  functionsList?: any[];
  note: Note;
  register?: UseFormRegister<any>; // temp
};

export const NotesButtonRow = ({
  functionsList,
  note,
}: Props) => {

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
