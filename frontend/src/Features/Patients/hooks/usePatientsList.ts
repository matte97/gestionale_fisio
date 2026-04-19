import { useQuery, UseQueryOptions, keepPreviousData } from "@tanstack/react-query";
import { getPatients, PaginatedPatients, PatientFilters } from "../Services/patients.service";
import { Patient } from "../Types/patients.type";

export const usePatientsList = (page: number = 1, filters?: PatientFilters) => {
  const options: UseQueryOptions<PaginatedPatients, Error> = {
    queryKey: ["patients", filters, page],
    queryFn: () => getPatients(page, filters),
    staleTime: 1000 * 60, // 1 minuto
    placeholderData: keepPreviousData,
  };

  return useQuery(options);
};
