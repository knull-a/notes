import type { Note } from "@/services/notes/types";

import { useEffect, useState } from "react";
import {
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { useRest } from "@/services";
import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotesList } from "@/components/Notes/NotesList";
import { NotesForm } from "@/components/Notes/NotesForm";
import { useHandleScroll } from "@/hooks/useHandleScroll";

import "./NotesPage.css";
import { useNotes } from "@/services/notes/hooks/useNotes";
import { useInfiniteNotes } from "@/services/notes/hooks/useInfiniteNotes";

const NotesPage = () => {
  const [formBackgroundColor, setFormBackgroundColor] = useState("");
  const api = useRest();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isSubmitLoading } = useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.postNote(newNote);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const {
    data: notes,
    fetchNextPage,
    isLoading: isNotesLoading,
    isError: hasNotesError,
    refetch: refetchNotes,
  } = useInfiniteNotes("notes");

  const {
    data: pinnedNotes,
    isLoading: isPinnedLoading,
    isError: hasPinnedError,
    refetch: refetchPinned,
  } = useNotes("pinned", {
    isPinned: true
  });

  const { register, handleSubmit, getValues, reset, setValue, watch } =
    useForm<Note>();

  useEffect(() => {
    window.addEventListener("scroll", () => useHandleScroll(fetchNextPage));
    return () => {
      console.log("scroll");
      window.removeEventListener("scroll", () =>
        useHandleScroll(fetchNextPage)
      );
    };
  }, []);

  async function onSubmit(data: Note) {
    mutate(data);
    await refetchNotes();
    await refetchPinned();
    reset();
  }

  if (isNotesLoading || isPinnedLoading)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (hasNotesError || hasPinnedError) return <div>Query error</div>;

  return (
    notes && (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-slightly-dark rounded-xl p-4 shadow-2xl max-w-xl m-auto mb-4"
          style={{ backgroundColor: formBackgroundColor }}
        >
          <NotesForm
            setValue={setValue}
            getValues={getValues}
            register={register}
            setFormBackgroundColor={setFormBackgroundColor}
            closeModal={() => reset()}
            watch={watch}
            isLoading={isSubmitLoading}
          />
        </form>
        {pinnedNotes.data !== undefined && (
          <NotesList
            parentPage="notes"
            title="Pinned"
            notes={pinnedNotes.data.flat()}
            refetch={refetchPinned}
          />
        )}
        <NotesList
          parentPage="notes"
          title="Other notes"
          notes={notes.pages.map((page) => page.data).flat()}
          refetch={refetchNotes}
        />
      </>
    )
  );
};

export default NotesPage;
