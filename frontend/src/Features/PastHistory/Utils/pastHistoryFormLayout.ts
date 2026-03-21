import { FieldConfig } from "../../../Shared/Types/field.types";

export const pastHistoryFormLayout: FieldConfig[][] = [
  [
    {
      name: "other_medical_conditions",
      label: "Patologie di altra natura",
      type: "textarea",
    },
    {
      name: "similar_episodes_treatments_outcome",
      label: "Episodi simili, terapie ed esito",
      type: "textarea",
    },
  ],
  [
    { name: "medication_use", label: "Uso di farmaci", type: "textarea" },
    {
      name: "physiological_history",
      label: "Anamnesi fisiologica",
      type: "textarea",
    },
  ],
  [{ name: "family_history", label: "Anamnesi familiare", type: "textarea" }],
];
