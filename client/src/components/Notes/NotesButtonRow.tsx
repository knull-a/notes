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

type Props = {
  isCreated?: boolean;
  functionsList?: any[];
  note?: Note;
  register?: UseFormRegister<any>; // temp
};

export const NotesButtonRow = ({
  isCreated,
  functionsList,
  note,
  register,
}: Props) => {
  const rowClasses = classNames({
    "buttons flex justify-center gap-6 mt-auto transition-opacity": true,
    "opacity-0": isCreated,
  });

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

  return (
    <div className={rowClasses}>
      <label onClick={(e) => e.stopPropagation()}>
        <input
          className="absolute opacity-0 pointer-events-none bottom-0"
          type="color"
          onChange={(e) => functionsList && functionsList[0](e, note)}
          {...(register && register("color"))}
        />
        <div className="btn">
          <Icon path={mdiPaletteOutline} size={1} />
        </div>
      </label>
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
    </div>
  );
};
