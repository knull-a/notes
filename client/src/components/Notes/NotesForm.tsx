import type { Note } from "@/services/notes/types";

import { useState, useEffect } from "react";

import Icon from "@mdi/react";
import { mdiPin, mdiPinOutline } from "@mdi/js";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRest } from "@/services";

import { CustomInput } from "../Custom/CustomInput";
import { CustomButton } from "../Custom/CustomButton";
import { NotesButtonRow } from "./NotesButtonRow";

export const NotesForm = () => {
  const [dots, setDots] = useState("");
  const [isPinned, setPinned] = useState(false);

  const queryClient = useQueryClient()

  const api = useRest();
  const { register, handleSubmit, getValues, reset } = useForm<Note>();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.postNote(newNote);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"])
  });

  const onSubmit: SubmitHandler<Note> = async (data) => {
    mutate(data)
    reset()
    console.log(data);
  };

  const handlePinned = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinned(e.target.checked);
    getValues().isPinned = e.target.checked
    console.log(isPinned, getValues())
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-slightly-dark rounded-xl p-4 shadow-2xl max-w-xl m-auto"
    >
      {getValues().text && (
        <div className="mb-4 flex gap-2 justify-between">
          <CustomInput<Note>
            name="title"
            register={register}
            placeholder="Enter title"
          />
            <input
              className="absolute top-0 left-0"
              id="isPinned"
              type="checkbox"
              checked={isPinned}
              {...register("isPinned")}
              onChange={handlePinned}
            />
          <label htmlFor="isPinned" className="btn">
            <Icon path={isPinned ? mdiPin : mdiPinOutline} size={1} />
          </label>
        </div>
      )}
      <div>
        <CustomInput<Note>
          name="text"
          register={register}
          isTextarea
          placeholder={`Note${dots}`}
          options={{ required: true }}
        />
      </div>
      {getValues().text && (
        <div className="flex gap-2 justify-end">
          <NotesButtonRow />
          <CustomButton text="Cancel" />
          <CustomButton isLoading={isLoading} text="Save" type="submit" />
        </div>
      )}
    </form>
  );
};
