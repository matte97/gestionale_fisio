import axiosClient from "../../Api/axiosClient";
import {
  CreateTherapiePayload,
  Therapie,
  UpdateTherapiesPayload,
} from "./therapies.type";

type TherapiesResponse = {
  success: boolean;
  data: Therapie[];
};

export const getTherapies = async (): Promise<Therapie[]> => {
  const response = await axiosClient.get<TherapiesResponse>("/therapies");
  console.log(response);
  return response.data.data || [];
};

type TherapieResponse = {
  success: boolean;
  data: Therapie;
};

export const getTherapieById = async (id: number): Promise<Therapie> => {
  const response = await axiosClient.get<TherapieResponse>(`/therapies/${id}`);
  return response.data.data;
};

export const createTherapie = async (
  payload: CreateTherapiePayload,
): Promise<Therapie> => {
  const response = await axiosClient.post<TherapieResponse>(
    "/patients",
    payload,
  );
  return response.data.data;
};

export const updateTherapie = async (
  payload: UpdateTherapiesPayload,
  id: number,
): Promise<Therapie> => {
  const response = await axiosClient.put<TherapieResponse>(
    `/patients/${id}`,
    payload,
  );
  return response.data.data;
};

export const deleteTherapie = async(id:number): Promise<void> => {
    await axiosClient.delete(`/therapies/${id}`);
}
