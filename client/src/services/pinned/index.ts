import { AxiosInstance } from "axios";
import { BaseRest } from "../base";
import { Note } from "@/services/notes/types";

export class PinnedRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public getPinnedNotes() {
    return this.get<Note[]>("/pinned/")
  }

  public getPinnedNote(id: string) {
    return this.get<Note>(`/pinned/${id}`)
  }

  public deletePinnedNote(id: string) {
    return this.delete<Note>(`/pinned/${id}/`)
  }

  public postPinnedNote(data: object) {
    return this.post<Note>("/pinned/", data)
  }

  public patchPinnedNote(data: object, id: string) {
    return this.patch<Note>(`/pinned/${id}/`, data)
  }
}