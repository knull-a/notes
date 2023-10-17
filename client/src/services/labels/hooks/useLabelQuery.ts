import { useRest } from "@/services";
import { useQuery } from "@tanstack/react-query";

const api = useRest();

export const useLabelQuery = (name: string, params?: object) =>
  useQuery(
    [name],
    async () => await api.labels.getLabels({ sort: "-updatedAt", ...params })
  );
