import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRest } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CustomModal from "@/components/Custom/CustomModal";
import { NotesForm } from "@/components/Notes/NotesForm";
import { useForm } from "react-hook-form";
import { Note } from "@/services/notes/types";
import { useEffect } from "react";

const NotePage = () => {
  const { id } = useParams();
  const api = useRest();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const {
    data: note,
    isLoading: isNoteLoading,
    isError: hasNoteError,
    refetch: refetchNote
  } = useQuery(["note"], async () => await api.notes.getNote(id as string));

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

  function handleCloseModal() {
    const parentPath = pathname.substring(0, pathname.lastIndexOf("/"));
    if (parentPath === "") return navigate("/");
    navigate(parentPath);
  }

  async function onSubmit(data: Note) {
    mutate(data);
    await refetchNote()
    handleCloseModal();
  }

  useEffect(() => {
    if (note) {
      reset(note);
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
