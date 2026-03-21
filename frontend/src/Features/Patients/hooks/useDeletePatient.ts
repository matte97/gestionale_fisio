import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";

export const useDeletePatients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => axiosClient.delete(`/patients/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
        exact: false,
      });
    },
  });
};
