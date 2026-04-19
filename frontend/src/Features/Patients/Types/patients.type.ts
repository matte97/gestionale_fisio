export interface Patient {
  user_id: number;
  patient_id: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  phone?: string;
  birth_date: string;
  gender?: "M" | "F" | "Altro";
  occupation?: string;
  sports_hobbies?: string;
  marital_status?: string;
  diagnosis?: string;
}

export type CreatePatientPayload = Omit<Patient, "patient_id" | "user_id">;

export type UpdatePatientPayload = Partial<CreatePatientPayload>;
