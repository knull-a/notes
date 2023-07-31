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
};

export const NotesButtonRow = ({ isCreated }: Props) => {
  const rowClasses = classNames({
    "buttons flex justify-center gap-6 mt-auto transition-opacity": true,
    "opacity-0": isCreated,
  });
  const labelList = [
    {
      id: 1,
      path: mdiPaletteOutline 
    }, 
    {
      id: 2,
      path: mdiImageOutline
    },
    {
      id: 3,
      path: mdiArchiveArrowDownOutline
    },
    {
      id: 4,
      path: mdiDeleteOutline
    }
  ]
  
  return (
    <div className={rowClasses}>
      {labelList.map(label => (
        <label className="btn" key={label.id}>
          <input type="checkbox" />
          <Icon path={label.path} />
        </label>
      ))}
    </div>
  );
};
