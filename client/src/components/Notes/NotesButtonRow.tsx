import {
  mdiPaletteOutline,
  mdiImageOutline,
  mdiArchiveArrowDownOutline,
  mdiDeleteOutline,
} from "@mdi/js";
import classNames from "classnames";

import Icon from "@mdi/react";

type Props = {
  isCreated?: boolean;
  functionsList?: Function[];
};

export const NotesButtonRow = ({ isCreated, functionsList }: Props) => {
  const rowClasses = classNames({
    "buttons flex justify-center gap-6 mt-auto transition-opacity": true,
    "opacity-0": isCreated,
  });

  const labelList = [
    {
      id: 1,
      path: mdiPaletteOutline,
    },
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
      func: functionsList && functionsList[index],
    };
  });

  return (
    <div className={rowClasses}>
      {mergedLabelList.map((label) => (
        <label className="btn" key={label.id} onClick={(e) => label.func && label.func(e)}>
          <input type="checkbox" hidden />
          <Icon path={label.path} size={1} />
        </label>
      ))}
    </div>
  );
};
