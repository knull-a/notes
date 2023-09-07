import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRest } from "@/services";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import CustomModal from "@/components/Custom/CustomModal";
import { NotesForm } from "@/components/Notes/NotesForm";
import { useForm } from "react-hook-form";
import { Note } from "@/services/notes/types";
import { useEffect, useState } from "react";
import { useInfiniteNotes } from "@/services/notes/hooks/useInfiniteNotes";
import { useNotes } from "@/services/notes/hooks/useNotes";
import useModalStore from "@/stores/modal";
import { PathName, WithPage } from "@/services/types";
import path from "path";

type Props = {
  pathName: PathName;
};

const NotePage = ({ pathName }: Props) => {
  const { id } = useParams();
  const api = useRest();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const queryClient = useQueryClient();

  const { data: note, isLoading: isNoteLoading } = useQuery(
    ["note"],
    async () => await api.notes.getNote(id as string)
  );

  const { refetch: refetchPinnedNotes } = useNotes("pinned", {
    isPinned: true,
  });

  const { refetch: refetchNotes } = useInfiniteNotes(
    pathName,
    pathName === "archive" ? { isArchived: true } : {}
  );

  const { mutate, isLoading: isSubmitLoading } = useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.patchNote(newNote, String(note?._id));
    },
    onSuccess: () => queryClient.invalidateQueries([pathName]),  
  });

  const modalVisible = pathname.includes(`/${pathName}/${id}`);

  const { register, handleSubmit, getValues, reset, setValue } = useForm<Note>({
    defaultValues: note,
  });

  const { changeColor: changeColorState, color } = useModalStore();

  function handleCloseModal() {
    const parentPath = pathname.substring(0, pathname.lastIndexOf("/"));
    if (parentPath === "") return navigate("/");
    navigate(parentPath);
  }

  async function onSubmit(data: Note) {
    mutate(data);
    console.log(pathName)
    await refetchNotes();
    if (pathName === "notes") {
      console.log("if");
      await refetchPinnedNotes();
    }
    handleCloseModal();
  }

  useEffect(() => {
    if (note) {
      reset(note);
      changeColorState(note.color);
      console.log(note.color, color, pathName);
    }
  }, [note, reset]);

  return (
    <>
      <CustomModal isVisible={modalVisible} setVisible={handleCloseModal}>
        {note && !isNoteLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <NotesForm
              register={register}
              getValues={getValues}
              setValue={setValue}
              isLoading={isSubmitLoading}
              closeModal={handleCloseModal}
              isModal
            />
          </form>
        )}
      </CustomModal>
    </>
  );
};

export default NotePage;
