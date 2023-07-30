import Icon from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";
export const NotesButtonItem = ({ path, color }: IconProps) => {
  return (
    <button className="btn">
      <Icon path={path} color={color} size={1} />
    </button>
  );
};
