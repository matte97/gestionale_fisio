export interface Symptoms {
  id: number;
  patient_history_id: number;
  type: string;
  characteristic: string;
  pattern: string;
  triggering_event: string;
  intensity_nprs: number;
  frequency: string;
  better_when: string;
  worse_when: string;
  trend: string;
}

export type CreateSymptomsPayload = {
  patient_history_id: number;
  type: string;
  characteristic: string;
  pattern: string;
  triggering_event: string;
  intensity_nprs: number;
  frequency: string;
  better_when: string;
  worse_when: string;
  trend: string;
};

export type UpdateSymptomsPayload = Partial<CreateSymptomsPayload>;
