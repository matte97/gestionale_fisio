import axiosClient from "../../Api/axiosClient";
import {
  CreatePastHistoryPayload,
  pastHistory,
  UpdatePastHistoryPayload,
} from "./pastHistory.types";

type pastHistoryResponse = {
  success: boolean;
  data: pastHistory;
};

export const getPastHistoryByAnamnesisId = async (
  anamnesisId: number,
): Promise<pastHistory> => {
  const response = await axiosClient.get<pastHistoryResponse>(
    `/past_history/${anamnesisId}`,
  );
  return response.data.data;
};

export const createPastHistory = async (
  anamnesisId: number,
  payload: CreatePastHistoryPayload,
): Promise<pastHistory> => {
  const response = await axiosClient.post<pastHistoryResponse>(
    "/past_history",
    {
      anamnesisId,
      payload,
    },
  );
  return response.data.data;
};

export const updatePastHistory = async (
  id: number,
  anamnesisId: number,
  payload: UpdatePastHistoryPayload,
): Promise<pastHistory> => {
  const response = await axiosClient.put<pastHistoryResponse>(
    `/past_history/${id}`,
    {
      anamnesisId,
      payload,
    },
  );
  return response.data.data;
};

export const deletePastHistory = async (id: number): Promise<void> => {
  const response = await axiosClient.delete(`/past_history/${id}`);
};
