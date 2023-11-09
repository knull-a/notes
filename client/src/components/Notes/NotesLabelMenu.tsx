import { useLabelQuery } from "@/services/labels/hooks/useLabelQuery";
import type { Label } from "@/services/labels/types";
import { Note } from "@/services/notes/types";
import {
  mdiLabelOutline,
  mdiRadioboxBlank,
  mdiRadioboxMarked,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useToggle } from "@reactuses/core";
import {
  Control,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

type Props = {
  register: UseFormRegister<Note>;
  control: Control<Note>;
};

export const NotesLabelMenu = ({ control }: Props) => {
  const [menuStatus, toggleMenuStatus] = useToggle(false);

  const { data: labels } = useLabelQuery("labels");

  const { fields, append, remove } = useFieldArray<Note>({
    control,
    name: "labels",
  });

  const hasLabel = (label: Label) =>
    fields.find((item) => item._id === label._id);

  const chooseLabel = (label: Label, idx: number) =>
    hasLabel(label) ? remove(idx) : append(label);

  return (
    <div className="relative">
      {menuStatus && (
        <div className="absolute z-50 top-14 bg-dark border border-slightly-dark rounded-lg -left-2 p-4">
          {labels?.map((label, idx) => (
            <div
              className="flex items-center gap-x-2 hover:bg-slightly-dark p-2 rounded-lg cursor-pointer"
              key={label._id}
              onClick={() => chooseLabel(label, idx)}
            >
              {hasLabel(label) ? (
                <Icon path={mdiRadioboxMarked} size={1} />
              ) : (
                <Icon path={mdiRadioboxBlank} size={1} />
              )}
              <p className="w-full">{label.title}</p>
            </div>
          ))}
        </div>
      )}
      <button type="button" className="btn" onClick={toggleMenuStatus}>
        <Icon path={mdiLabelOutline} size={1} />
      </button>
    </div>
  );
};
