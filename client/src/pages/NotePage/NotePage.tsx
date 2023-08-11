import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRest } from "@/services";
import { useQuery } from "@tanstack/react-query";

import CustomModal from "@/components/Custom/CustomModal";

const NotePage = () => {
  const { id } = useParams();
  const api = useRest();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    data: note,
    isLoading: isNoteLoading,
    isError: hasNoteError,
  } = useQuery(["note"], async () => await api.pinned.getPinnedNote(id as string));

  const modalVisible = pathname.includes(`/notes/${id}`);

  const closeModal = () => {
    const parentPath = pathname.substring(0, pathname.lastIndexOf("/"));
    if (parentPath === "") return navigate("/");
    navigate(parentPath);
  };

  return (
    <div>
      <CustomModal isVisible={modalVisible} setVisible={closeModal}>
        {note?.text}
        {note?._id}
      </CustomModal>
    </div>
  );
};

export default NotePage;
