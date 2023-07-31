import { useParams } from "react-router-dom"
import { useRest } from "@/services"
import { useQuery } from "@tanstack/react-query"

const NotePage = () => {
  const {id} = useParams()
  const api = useRest()
  const {
    data: note,
    isLoading: isNoteLoading,
    isError: hasNoteError,
  } = useQuery(["note"], async () => await api.pinned.getPinnedNote(id as string));
  return (
    <div>
      {note?.text}
      {note?._id}

    </div>
  )
}

export default NotePage