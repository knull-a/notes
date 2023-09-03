import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRest } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CustomModal from "@/components/Custom/CustomModal";
import { NotesForm } from "@/components/Notes/NotesForm";
import { useForm } from "react-hook-form";
import { Note } from "@/services/notes/types";
import { useEffect } from "react";
import { useNotes } from "@/services/notes/hooks/useNotes";
import { usePinnedNotes } from "@/services/notes/hooks/usePinnedNotes";
import useModalStore from "@/stores/modal";

const NotePage = () => {
  const { id } = useParams();
  const api = useRest();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const {
    data: note,
    isLoading: isNoteLoading,
    refetch: refetchNote,
  } = useQuery(["note"], async () => await api.notes.getNote(id as string));

  const { refetch: refetchPinnedNotes } = usePinnedNotes();

  const { refetch: refetchNotes } = useNotes();

  const { mutate, isLoading: isSubmitLoading } = useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.patchNote(newNote, String(note?._id));
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const modalVisible = pathname.includes(`/notes/${id}`);

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
    await refetchNote();
    await refetchNotes();
    await refetchPinnedNotes();
    handleCloseModal();
  }

  useEffect(() => {
    if (note) {
      reset(note);
      changeColorState(note.color);
      console.log(note.color, color)
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
