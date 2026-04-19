import { Symptoms } from "../../Symptoms/Types/symptom.type";

export interface PatientHistory {
  id: number;
  anamnesis_id: number;
  main_problem: string;
  patient_goals: string;
  onset: string;
  cause_of_onset: string;
  onset_date: string;
  symptomps_relationship: Symptoms[];
  other_signs_symptomps: string;
  phisical_activity: string;
  sleep_quality: string;
  health_lifestyle_changes: string;
  diagnostic_tests: string;
  other_diagnosis_therapies: string;
  activity_limitations: string;
  questionnaire: string;
  score: string;
  patient_perception_main_problem: string;
}

export type CreatePatientHistoryPayload = {
  main_problem: string;
  patient_goals: string;
  onset: string;
  cause_of_onset: string;
  onset_date: string;
  symptomps_relationship: Symptoms[];
  other_signs_symptomps: string;
  phisical_activity: string;
  sleep_quality: string;
  health_lifestyle_changes: string;
  diagnostic_tests: string;
  other_diagnosis_therapies: string;
  activity_limitations: string;
  questionnaire: string;
  score: string;
  patient_perception_main_problem: string;
};

export type UpdatePatientHistoryPayload = Partial<CreatePatientHistoryPayload>;
