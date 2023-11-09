import { Label } from "@/services/labels/types";
import { useForm } from "react-hook-form";
import { CustomInput } from "../Custom/CustomInput";
import Icon from "@mdi/react";
import { mdiCheck, mdiDelete } from "@mdi/js";
import { useRest } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  label: Partial<Label>;
  isNew?: boolean;
};

export const SidebarLabelItem = ({ label, isNew }: Props) => {
  const { register, handleSubmit } = useForm<Label>({
    defaultValues: label,
  });

  const queryClient = useQueryClient();

  const api = useRest();

  const { mutate } = useMutation({
    mutationFn: async (newLabel: Label) => {
      return isNew
        ? await api.labels.postLabel(newLabel)
        : await api.labels.patchLabel(newLabel, String(label._id));
    },
    onSuccess: () => queryClient.invalidateQueries(["labels"]),
  });

  const { mutate: deleteLabel } = useMutation({
    mutationFn: async () => {
      await api.labels.deleteLabel(label._id ?? "");
    },
    onSuccess: () => queryClient.invalidateQueries(["labels"]),
  });

  async function onSubmit(data: Label) {
    console.log(data);
    mutate(data);
  }

  return (
    <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        placeholder="Введите название лейбла"
        register={register}
        name="title"
      />
      {!isNew && (
        <button className="btn" type="button" onClick={() => deleteLabel()}>
          <Icon path={mdiDelete} size={1} />
        </button>
      )}
      <button className="btn">
        <Icon path={mdiCheck} size={1} />
      </button>
    </form>
  );
};
