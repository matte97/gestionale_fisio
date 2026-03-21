import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "../patients.services";
import { CreatePatientPayload } from "../patients.type";

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePatientPayload) => createPatient(payload),

    onSuccess: (newPatient) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
