import {
  mdiPaletteOutline,
  mdiImageOutline,
  mdiArchiveArrowDownOutline,
  mdiDeleteOutline,
} from "@mdi/js";
import classNames from "classnames";

import { NotesButtonItem } from "./NotesButtonItem";

type Props = {
  isCreated?: boolean;
};

export const NotesButtonRow = ({ isCreated }: Props) => {
  const rowClasses = classNames({
    "buttons flex justify-center gap-6 mt-auto transition-opacity": true,
    "opacity-0": isCreated,
  });
  
  return (
    <div className={rowClasses}>
      <NotesButtonItem path={mdiPaletteOutline} />
      <NotesButtonItem path={mdiImageOutline} />
      <NotesButtonItem path={mdiArchiveArrowDownOutline} />
      <NotesButtonItem path={mdiDeleteOutline} />
    </div>
  );
};
