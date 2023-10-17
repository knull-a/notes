import { Note } from "../notes/types"

export type Label = {
  _id: string // todo: use interface with extends or &
  title: string
  notes: Note[]
}