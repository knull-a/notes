import { mdiPencilOutline } from "@mdi/js";
import CustomModal from "../Custom/CustomModal";
import { useToggle } from "@reactuses/core";
import { CustomButton } from "../Custom/CustomButton";
import { useLabelQuery } from "@/services/labels/hooks/useLabelQuery";
import { SidebarLabelItem } from "./SidebarLabelItem";
import { Label } from "@/services/labels/types";

export const SidebarLabelForm = () => {
  const [modalStatus, toggleModalStatus] = useToggle(false);

  const { data: labels } = useLabelQuery("labels");
  
  const newLabel: Partial<Label> = {
    title: ""
  }

  return (
    <>
      <CustomModal
        isVisible={modalStatus}
        setVisible={toggleModalStatus}
        hasCloseIcon={false}
      >
        <SidebarLabelItem isNew label={newLabel} />
        {labels?.map((label) => (
          <SidebarLabelItem key={label._id} label={label} />
        ))}
      </CustomModal>
      <CustomButton
        className="sidebar-item"
        isSidebarItem
        text="Edit Labels"
        onClick={toggleModalStatus}
        icon={{ path: mdiPencilOutline, size: 1 }}
      />
    </>
  );
};
