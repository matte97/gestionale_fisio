export interface pastHistory {
  id: number;
  anamnesis_id: number;
  other_medical_condition: string;
  similar_episodes_treatments_outcome: string;
  medication_use: string;
  physiological_history: string;
  family_history: string;
}

export type CreatePastHistoryPayload = {
  anamnesis_id: number;
  other_medical_condition: string;
  similar_episodes_treatments_outcome: string;
  medication_use: string;
  physiological_history: string;
  family_history: string;
};

export type UpdatePastHistoryPayload = Partial<CreatePastHistoryPayload>;
