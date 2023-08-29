import axios from "axios"
import { NotesRest } from "./notes"

export class Rest {
  public readonly notes

  private endpoint

  public constructor() {
    this.endpoint = this.createAxios()

    this.notes = new NotesRest(this.endpoint)
  }

  private createAxios() {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  }
}

export const useRest = () => {
  const api = new Rest()
  return api
}