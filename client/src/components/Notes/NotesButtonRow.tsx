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
      id: 2,
      path: mdiImageOutline,
    },
    {
      id: 3,
      path: mdiArchiveArrowDownOutline,
    },
    {
      id: 4,
      path: mdiDeleteOutline,
    },
  ];

  const mergedLabelList = labelList.map((item, index) => {
    return {
      ...item,
      func: functionsList && functionsList[index + 1],
    };
  });

  async function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    setColorValue(e.target.value);
    console.log(colorValue, e.target.value);
    
  }

  return (
    <>
      {/* <label onClick={(e) => e.stopPropagation()}>
        <input
          className="absolute opacity-0 pointer-events-none bottom-0"
          type="color"
          onChange={(e) => changeColor(e)}
          value={colorValue}
          {...(register && register("color"))}
        />
        <div className="btn">
          <Icon path={mdiPaletteOutline} size={1} />
        </div>
      </label> */}
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
