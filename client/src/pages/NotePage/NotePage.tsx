import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRest } from "@/services";
import { useQuery } from "@tanstack/react-query";

import CustomModal from "@/components/Custom/CustomModal";
import { CustomLoader } from "@/components/Custom/CustomLoader";
import { CustomInput } from "@/components/Custom/CustomInput";
import { NotesForm } from "@/components/Notes/NotesForm";
import { useForm } from "react-hook-form";
import { Note } from "@/services/notes/types";

const NotePage = () => {
  const { id } = useParams();
  const api = useRest();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    data: note,
    isLoading: isNoteLoading,
    isError: hasNoteError,
  } = useQuery(
    ["note"],
    async () => await api.pinned.getPinnedNote(id as string)
  );

  const modalVisible = pathname.includes(`/notes/${id}`);

  const { register, handleSubmit, getValues, reset } = useForm<Note>();


  const closeModal = () => {
    const parentPath = pathname.substring(0, pathname.lastIndexOf("/"));
    if (parentPath === "") return navigate("/");
    navigate(parentPath);
  };

  return (
    <>
      <CustomModal isVisible={modalVisible} setVisible={closeModal}>  
        <NotesForm register={register} getValues={getValues} isLoading={false} />
      </CustomModal>
    </>
   );
};

export default NotePage;
