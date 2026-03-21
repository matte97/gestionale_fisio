import axiosClient from "../../Api/axiosClient";
import {
  CreatePatientPayload,
  Patient,
  UpdatePatientPayload,
} from "./patients.type";

// Tipizzazione della risposta per la lista dei pazienti
type PatientsResponse = {
  success: boolean;
  data: Patient[];
};

export const getPatients = async (filters?: {
  first_name?: string;
}): Promise<Patient[]> => {
  const response = await axiosClient.get<PatientsResponse>("/patients", {
    params: filters,
  });
  console.log(response);
  return response.data.data || [];
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
