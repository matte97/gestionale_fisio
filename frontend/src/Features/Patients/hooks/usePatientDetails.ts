import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatientById } from "../patients.services";
import { Patient } from "../patients.type";

export const usePatientDetails = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatientById(id),
    staleTime: 1000 * 60,
    initialData: () => {
      const patientList = queryClient.getQueryData<Patient[]>(["patients"]);
      return patientList?.find((p) => p.patient_id === id);
    },
  });
};
