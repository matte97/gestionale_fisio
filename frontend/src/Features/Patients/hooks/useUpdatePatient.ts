import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "../patients.services";
import { Patient, UpdatePatientPayload } from "../patients.type";

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdatePatientPayload;
    }) => updatePatient(id, payload),

    onSuccess: (updatedPatient) => {
      queryClient.setQueryData(
        ["patient", updatedPatient.patient_id],
        updatedPatient
      );

      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
