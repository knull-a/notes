import { useRest } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "../types";

const api = useRest();

export function useEditNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.patchNote(newNote, newNote._id);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await api.notes.deleteNote(id);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });
}
