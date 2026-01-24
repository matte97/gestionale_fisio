export const pastHistoryFormLayout = (pastHistory) => [
  [{ type: "section", title: "Anamnesi patologica remota" }],
  [
    {
      label: "Patologie di altra natura",
      name: "other_medical_conditions",
      value: pastHistory.other_medical_conditions,
      type: "textarea",
      rows: 3,
    },
    {
      label: "Episodi simili, terapie ed esito",
      name: "similar_episodes_treatments_outcome",
      value: pastHistory.similar_episodes_treatments_outcome,
      type: "textarea",
      rows: 3,
    },
  ],
  [
    {
      label: "Uso di farmaci",
      name: "medication_use",
      value: pastHistory.medication_use,
      type: "textarea",
      rows: 3,
    },
    {
      label:
        "Anamnesi fisiologica (ciclo mestruale,gravidanze, stile di vita, BMI…)",
      name: "physiological_history",
      value: pastHistory.physiological_history,
      type: "textarea",
      rows: 3,
    },
  ],
  [
    {
      label: "Anamnesi familiare",
      name: "family_history",
      value: pastHistory.family_history,
      type: "textarea",
      rows: 3,
    },
  ],
];
