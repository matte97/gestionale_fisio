export const patientHistoryFormLayout = (patientHistory) => [
  [
    {
      label: "Problema principale",
      name: "main_problem",
      value: patientHistory.main_problem,
      type: "textarea",
      rows: 2,
    },
    {
      label: "Obbiettivi del paziente",
      name: "patient_goals",
      value: patientHistory.patient_goals,
      type: "textarea",
      rows: 2,
    },
  ],
  [
    {
      label: "Esordio",
      name: "onset",
      value: patientHistory.onset,
      type: "radiogroup",
      options: [
        { value: "traumatic", label: "Traumatico" },
        { value: "insidious", label: "Insidioso" },
      ],
    },
    {
      label: "Causa",
      name: "cause_of_onset",
      value: patientHistory.cause_of_onset,
      type: "text",
    },
    {
      label: "Data",
      name: "onset_date",
      value: patientHistory.onset_date,
      type: "date",
    },
  ],
  [
    {
      label: "Relazione tra i sintomi",
      name: "symptomps_relationship",
      value: patientHistory.symptomps_relationship,
      type: "textarea",
      rows: 2,
    },
    {
      label: "Altri segni e sintomi MS o non MS",
      name: "other_signs_symptomps",
      value: patientHistory.other_signs_symptomps,
      type: "textarea",
      rows: 2,
    },
  ],
  [
    {
      label: "Attività fisica",
      name: "phisical_activity",
      value: patientHistory.phisical_activity,
      type: "textarea",
      rows: 2,
    },
    {
      label: "Qualità del sonno",
      name: "sleep_quality",
      value: patientHistory.sleep_quality,
      type: "textarea",
      rows: 2,
    },
  ],
  [
    
    {
      label: "Altre modificazioni salute (es. peso) o stile di vita",
      name: "health_lifestyle_changes",
      value: patientHistory.health_lifestyle_changes,
      type: "textarea",
      rows: 2,
    },
    {
      label: "Diagnostica strumentale/laboratorio",
      name: "diagnostic_tests",
      value: patientHistory.diagnostic_tests,
      type: "textarea",
      rows: 2,
    },
  ],
  [
    {
      label: "Altre diagnosi/terapie e loro esito",
      name: "other_diagnosis_therapies",
      value: patientHistory.other_diagnosis_therapies,
      type: "textarea",
      rows: 2,
    },
  ],
];
