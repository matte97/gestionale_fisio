export interface Anamnesis {
  id: number;
  user_id: number;
  patient_id: number;
}

export type CreateAnamnesisPayload = {
  patient_id: number;
};

export type UpdateAnamnesisPayload = Partial<CreateAnamnesisPayload>;
