import { AccessoryPassiveMovements } from "../AccessoryPassiveMovements/AccessoryPassiveMovements.types";
import { ActiveMovements } from "../ActiveMovements/ActiveMovements.types";
import { PassivePhysiologicalMovements } from "../PassivePhysiologicalMovements/PassivePhysiologicalMovements.types";

export interface PhysicalExamination {
  id: number;
  anamnesis_id: number;
  baseline_symptoms: string;
  symptom_postural_correlations: boolean;
  local_correlation: string;
  regional_correlation: string;
  global_correlation: string;
  red_flag: string;
  neurological_function: string;
  neurological_exam_necessary?: boolean;
  mechanosensitivity: string;
  provocative_relieving_movements: string;
  active_movements_region: ActiveMovements[];
  passive_movements_region: PassivePhysiologicalMovements[];
  accessory_passive_movements_region: AccessoryPassiveMovements[];
  neuromuscular_strength: string;
  neuromuscular_endurance: string;
  neuromuscular_motor_control: string;
  neuromuscular_power: string;
  special_test: string;
}

export type CreatePhysicalExaminationPayload = Omit<
  PhysicalExamination,
  "id" | "anamnesis_id"
>;

export type UpdatePhysicalExaminationPayload =
  Partial<CreatePhysicalExaminationPayload>;
