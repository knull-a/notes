import { AxiosInstance } from "axios";
import { BaseRest } from "../base";
import { Note } from "./types";
import { WithPage } from "../types";

export class NotesRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public getNotes(params: object) {
    return this.get<WithPage<Note[]>>("/notes/", params)
  }

  public getNote(id: string) {
    return this.get<Note>(`/notes/${id}`)
  }

  public deleteNote(id: string) {
    return this.delete<Note>(`/notes/${id}/`)
  }

  public postNote(data: object) {
    return this.post<Note>("/notes/", data)
  }

  public patchNote(data: object, id: string) {
    return this.patch<Note>(`/notes/${id}/`, data)
  }
}