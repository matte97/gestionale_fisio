import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPatients } from "../patients.services";
import { Patient } from "../patients.type";

type PatientFilters = {
  first_name?: string;
};

export const usePatientsList = (filters?: PatientFilters) => {
  const options: UseQueryOptions<Patient[], Error> = {
    queryKey: ["patients", filters],
    queryFn: () => getPatients(filters),
    staleTime: 1000 * 60, // 1 minuto
  };

  return useQuery(options);
};
