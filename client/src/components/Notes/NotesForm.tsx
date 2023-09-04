import type { Note } from "@/services/notes/types";

import { useState, useEffect } from "react";

import Icon from "@mdi/react";
import { mdiPaletteOutline, mdiPin, mdiPinOutline } from "@mdi/js";

import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { CustomInput } from "../Custom/CustomInput";
import { CustomButton } from "../Custom/CustomButton";
import { NotesButtonRow } from "./NotesButtonRow";
import useModalStore from "@/stores/modal";

type Props = {
  getValues: UseFormGetValues<Note>;
  setValue: UseFormSetValue<Note>;
  register: UseFormRegister<Note>;
  isLoading: boolean;
  isModal?: boolean;
  closeModal?: () => void;
};

export const NotesForm = ({
  getValues,
  register,
  closeModal,
  isLoading,
  isModal,
  setValue,
}: Props) => {
  const [dots, setDots] = useState("");
  const isFormPinned = getValues("isPinned");
  const formText = getValues("text");
  const note = getValues();

  const { changeColor: changeColorState } = useModalStore();

  const handlePinned = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("isPinned", e.target.checked);
  };

  function changeColorValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue("color", e.target.value);
    changeColorState(e.target.value);
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
        </div>
      )}
      <div>
        <CustomInput
          name="text"
          register={register}
          isTextarea
          placeholder={`Note${dots}`}
          options={{ required: true }}
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
            <NotesButtonRow note={note} />
          </div>
          <CustomButton text="Cancel" onClick={closeModal} />
          <CustomButton isLoading={isLoading} text="Save" type="submit" />
        </div>
      )}
    </>
  );
};
