import { Appointment, AppointmentFormData, UpdateAppointmentPayload } from "../appointment.type";
import { CreateAppointmentPayload } from "../appointment.type";

const formatDateTime = (date: string, time: string) =>
  `${date} ${time}:00`;

export const mapFormToCreatePayload = (
  data: AppointmentFormData
): CreateAppointmentPayload => {
  return {
    patient_id: data.patient_id,
    therapy_id: data.therapy_id,
    date: data.date,
    start_time: formatDateTime(data.date, data.start_hour),
    end_time: formatDateTime(data.date, data.end_hour),
    status: "scheduled",
    notes: data.notes,
  };
};

export const mapAppointmentToForm = (
  appointment: Appointment
): AppointmentFormData => {
  const startDate = new Date(appointment.start_time);
  const endDate = new Date(appointment.end_time);

  const date = appointment.start_time.split(" ")[0];

  const start_hour = startDate.toTimeString().slice(0, 5);
  const end_hour = endDate.toTimeString().slice(0, 5);

  return {
    patient_id: appointment.patient_id,
    therapy_id: appointment.therapy_id,
    date,
    start_hour,
    end_hour,
    status: appointment.status,
    notes: appointment.notes || "",
  };
};

export const mapFormToUpdatePayload = (
  data: AppointmentFormData
): UpdateAppointmentPayload => {
  return {
    patient_id: data.patient_id,
    therapy_id: data.therapy_id,
    start_time: formatDateTime(data.date, data.start_hour),
    end_time: formatDateTime(data.date, data.end_hour),
    status: data.status || "scheduled",
    notes: data.notes,
  };
};


