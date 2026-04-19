import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatientById, PaginatedPatients } from "../Services/patients.service";
import { Patient } from "../Types/patients.type";

export const usePatientDetails = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatientById(id),
    staleTime: 1000 * 60,
    initialData: () => {
      const patientList = queryClient.getQueryData<PaginatedPatients>(["patients"]);
      return patientList?.data?.find((p) => p.patient_id === id);
    },
  });
};
