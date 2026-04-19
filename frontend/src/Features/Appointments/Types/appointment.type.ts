export interface Appointment {
  id: number;
  patient_id: number;
  start_time: string;
  end_time: string;
  therapy_id: number;
  status: string;
  notes: string;
}

export interface AppointmentFormData {
  patient_id: number;
  therapy_id: number;
  date: string;
  start_hour: string;
  end_hour: string;
  status: string;
  notes: string;
}


export interface CreateAppointmentPayload {
  patient_id: number;
  date: string;
  start_time: string;
  end_time: string;
  therapy_id: number;
  status?: string;
  notes?: string;
}

export type UpdateAppointmentPayload = Partial<CreateAppointmentPayload>;
