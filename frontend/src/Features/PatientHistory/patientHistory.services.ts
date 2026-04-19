import axiosClient from "../../Api/axiosClient";
import {
  CreatePatientHistoryPayload,
  PatientHistory,
  UpdatePatientHistoryPayload,
} from "./Types/patientHistory.type";

type PatientHistoryResponse = {
  success: boolean;
  data: PatientHistory;
};

export const getPatientHistoryById = async (
  id: number,
): Promise<PatientHistory> => {
  const response = await axiosClient.get<PatientHistoryResponse>(
    `/patient_history/${id}`,
  );
  return response.data.data;
};

export const createPatientHistory = async (
  anamnesisId: number,
  payload: CreatePatientHistoryPayload,
): Promise<PatientHistory> => {
  const response = await axiosClient.post<PatientHistoryResponse>(
    "/patient_history",
    {
      anamnesisId,
      payload,
    },
  );
  return response.data.data;
};

export const updatePatientHistory = async (
  id: number,
  payload: UpdatePatientHistoryPayload,
): Promise<PatientHistory> => {
  const response = await axiosClient.put<PatientHistoryResponse>(
    `/patient_history/${id}`,
    payload,
  );
  return response.data.data;
};

export const deletePatientHistory = async (id: number): Promise<void> => {
  await axiosClient.delete(`/patient_history/${id}`);
};
