import axiosClient from "../../../Api/axiosClient";
import {
  Appointment,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "../Types/appointment.type";

type AppointmentsResponse = {
  success: boolean;
  data: Appointment[];
};

type GetAppointmentParams = {
  patient_id: number;
};

export const getAppointmentByUserId = async ({
  patient_id,
}: GetAppointmentParams): Promise<Appointment[]> => {
  const response = await axiosClient.get<AppointmentsResponse>(
    `/appointments`, { params: { patient_id } }
  );
  return response.data.data;
};

export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await axiosClient.get<AppointmentsResponse>("/appointments");
  return response.data.data;

};

type AppointmentResponse = {
  success: boolean;
  data: Appointment;
};

export const getAppointmentById = async (id: number, patientId: number): Promise<Appointment> => {
  const response = await axiosClient.get<AppointmentResponse>(
    `/appointments/${id}`,
    {
      params: { patient_id: patientId }
    }
  );
  return response.data.data;
};


export const createAppointment = async (
  payload: CreateAppointmentPayload,
): Promise<Appointment> => {
  const response = await axiosClient.post<AppointmentResponse>(
    "/appointments",
    payload,
  );

  return response.data.data;
};

export const updateAppointment = async (
  id: number,
  payload: UpdateAppointmentPayload,
): Promise<Appointment> => {
  const response = await axiosClient.put<AppointmentResponse>(
    `/appointments/${id}`,
    payload,
  );
  return response.data.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await axiosClient.delete(`/appointments/${id}`);
};
