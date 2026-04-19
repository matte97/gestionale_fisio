import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPatients, PaginatedPatients, PatientFilters } from "../patients.services";
import { Patient } from "../patients.type";

export const usePatientsList = (page: number = 1, filters?: PatientFilters) => {
  const options: UseQueryOptions<PaginatedPatients, Error> = {
    queryKey: ["patients", filters, page],
    queryFn: () => getPatients(page, filters),
    staleTime: 1000 * 60, // 1 minuto
  };

  return useQuery(options);
};
