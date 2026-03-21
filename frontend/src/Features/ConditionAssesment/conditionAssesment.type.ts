export interface ConditionAssesment {
  id: number;
  anamnesis_id: number;
  possible_sources: string;
  mechanical_or_non_mechanical: string;
  pain_type: string;
  pain_mechanism: string;
  severity: string;
  irritability: string;
  nature: string;
  stage: string;
  stability: string;
  mobility_deficit_present: boolean;
  mobility_deficit_notes: string;
  neuromuscular_deficit_present: boolean;
  neuromuscular_deficit_notes: string;
  local_load_capacity_present: boolean;
  local_load_capacity_notes: string;
  global_load_capacity_present: boolean;
  global_load_capacity_notes: string;
  neural_mechanosensitivity_present: boolean;
  neural_mechanosensitivity_notes: string;
  hyperalgesia_or_allodynia_present: boolean;
  hyperalgesia_or_allodynia_notes: string;
  biological_factors: string;
  psychological_factors: string;
  social_factors: string;
  positive_prognostic_factors: string;
  negative_prognostic_factors: string;
  contraindications: string;
  precautions: string;
  indications: string;
}

export type CreateConditionAssesmentPayload = Omit<
  ConditionAssesment,
  "id" | "anamnesis_id"
>;

export type UpdateConditionAssesmentPaylaod =
  Partial<CreateConditionAssesmentPayload>;
