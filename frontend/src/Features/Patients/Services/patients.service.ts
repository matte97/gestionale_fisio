import axiosClient from "../../../Api/axiosClient";
import {
  CreatePatientPayload,
  Patient,
  UpdatePatientPayload,
} from "../Types/patients.type";

export type PatientFilters = {
  search?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  diagnosis?: string;
  birth_year?: string;
};

// Tipizzazione della risposta per la lista dei pazienti (Formato Standard Laravel Resource con Pagination)
export type PaginatedPatients = {
  data: Patient[];
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  success: boolean;
};

export const getPatients = async (
  page: number = 1,
  filters?: PatientFilters
): Promise<PaginatedPatients> => {
  const response = await axiosClient.get<PaginatedPatients>("/patients", {
    params: { ...filters, page },
  });
  return response.data;
};

// Singolo paziente (la risposta è { success: boolean, data: Patient })
type PatientResponse = {
  success: boolean;
  data: Patient;
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await axiosClient.get<PatientResponse>(`/patients/${id}`);
  return response.data.data;
};

// Creazione di un paziente
export const createPatient = async (
  payload: CreatePatientPayload,
): Promise<Patient> => {
  const response = await axiosClient.post<PatientResponse>(
    "/patients",
    payload,
  );
  return response.data.data;
};

// Aggiornamento di un paziente
export const updatePatient = async (
  id: number,
  payload: UpdatePatientPayload,
): Promise<Patient> => {
  const response = await axiosClient.put<PatientResponse>(
    `/patients/${id}`,
    payload,
  );
  return response.data.data;
};

// Cancellazione di un paziente
export const deletePatient = async (id: number): Promise<void> => {
  await axiosClient.delete(`/patients/${id}`);
};
