import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "../Services/patients.service";
import { CreatePatientPayload } from "../Types/patients.type";

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePatientPayload) => createPatient(payload),

    onSuccess: (newPatient) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
