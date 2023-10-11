import type { Note } from "@/services/notes/types";

import { useState, useEffect } from "react";

import Icon from "@mdi/react";
import {
  mdiArchiveOutline,
  mdiDeleteOutline,
  mdiImageOutline,
  mdiPaletteOutline,
  mdiPin,
  mdiPinOutline,
} from "@mdi/js";

import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { CustomInput } from "../Custom/CustomInput";
import { CustomButton } from "../Custom/CustomButton";
import useModalStore from "@/stores/modal";
import { useRest } from "@/services";
import { useEditNote } from "@/services/notes/hooks/useMutateNote";

type FormProps = {
  getValues: UseFormGetValues<Note>;
  setValue: UseFormSetValue<Note>;
  register: UseFormRegister<Note>;
};

type Props = {
  setFormBackgroundColor?: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  isModal?: boolean;
  closeModal: () => void;
  watch?: UseFormWatch<Note>;
  refetch?: () => Promise<void>;
};

const PinButton = ({ register, getValues, setValue }: FormProps) => {
  const isFormPinned = getValues("isPinned");
  const handlePinned = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("isPinned", e.target.checked);
  };

  return (
    <>
      <input
        className="absolute top-0 left-0"
        id="isPinned"
        type="checkbox"
        checked={isFormPinned ?? false}
        {...register("isPinned")}
        onChange={handlePinned}
        hidden
      />
      <label htmlFor="isPinned" className="btn">
        <Icon path={isFormPinned ? mdiPin : mdiPinOutline} size={1} />
      </label>
    </>
  );
};

export const NotesForm = ({
  getValues,
  register,
  closeModal,
  isLoading,
  isModal,
  setValue,
  refetch,
  setFormBackgroundColor,
}: Props & FormProps) => {
  const [dots, setDots] = useState("");

  const formText = getValues("text");
  const note = getValues();

  const { changeColor: changeColorState } = useModalStore();
  const { mutate: edit } = useEditNote();
  const api = useRest()

  function changeColorValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (setFormBackgroundColor) setFormBackgroundColor(e.target.value);
    setValue("color", e.target.value);
    changeColorState(e.target.value);
  }

  async function archiveNote() {
    edit({ ...note, isArchived: !note.isArchived, isPinned: false });
    if (refetch) await refetch();
  }

  async function removeNote() {
    api.notes.deleteNote(note._id) 
    if (refetch) await refetch()
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {(isModal || formText) && (
        <div className="mb-4 flex gap-2 justify-between">
          <CustomInput
            name="title"
            register={register}
            placeholder="Enter title"
          />
          {!note.isArchived && (
            <PinButton
              getValues={getValues}
              setValue={setValue}
              register={register}
            />
          )}
        </div>
      )}
      <div>
        <CustomInput
          name="text"
          register={register}
          as="textarea"
          placeholder={`Note${dots}`}
          options={{ required: true }}
          setValue={setValue}
        />
        <CustomInput name="color" register={register} hidden />
      </div>
      {(isModal || formText) && (
        <div className="flex gap-2 justify-end">
          <div className="buttons flex justify-center gap-6 mt-auto transition-opacity">
            <label onClick={(e) => e.stopPropagation()}>
              <input
                className="absolute opacity-0 pointer-events-none bottom-0"
                type="color"
                {...(register && register("color"))}
                onChange={(e) => changeColorValue(e)}
              />
              <div className="btn">
                <Icon path={mdiPaletteOutline} size={1} />
              </div>
            </label>
            <label>
              <input type="file" name="image" hidden />
              <div className="btn">
                <Icon path={mdiImageOutline} size={1} />
              </div>
            </label>
            <button className="btn" onClick={archiveNote} type="button">
              <Icon path={mdiArchiveOutline} size={1} />
            </button>
            <button className="btn" onClick={removeNote} type="button">
              <Icon path={mdiDeleteOutline} size={1} />
            </button>
          </div>
          <CustomButton text="Cancel" onClick={closeModal} />
          <CustomButton isLoading={isLoading} text="Save" type="submit" />
        </div>
      )}
    </>
  );
};
