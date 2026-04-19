import { FieldConfig } from "../../../Shared/Types/field.types";

export const patientHistoryFormLayout: FieldConfig[][] = [
    [
      { label: "Problema principale", name: "main_problem", type: "textarea" },
      {
        label: "Obbiettivi del paziente",
        name: "patient_goals",
        type: "textarea",
      },
    ],
    [
      {
        label: "Esordio",
        name: "onset",
        type: "radiogroup",
        options: [
          { value: "traumatic", label: "Traumatico" },
          { value: "insidious", label: "Insidioso" },
        ],
      },
      { label: "Causa", name: "cause_of_onset", type: "input" },
      { label: "Data", name: "onset_date", type: "date" },
    ],
    [
      {
        type: "symptomsArray",
        name: "symptomps_relationship",
        label: "Sintomi",
      },
    ],
    [
      {
        type: "bodyMap",
        name: "body_chart",
        label: "Localizzazione Sensazioni/Sintomi",
      },
    ],
    [
      {
        label: "Altri segni e sintomi MS o non MS",
        name: "other_signs_symptomps",
        type: "textarea",
      },
    ],
    [
      { label: "Attività fisica", name: "phisical_activity", type: "textarea" },
      { label: "Qualità del sonno", name: "sleep_quality", type: "textarea" },
    ],
    [
      {
        label: "Altre modificazioni salute (es. peso) o stile di vita",
        name: "health_lifestyle_changes",
        type: "textarea",
      },
      {
        label: "Diagnostica strumentale/laboratorio",
        name: "diagnostic_tests",
        type: "textarea",
      },
    ],
    [
      {
        label: "Altre diagnosi/terapie e loro esito",
        name: "other_diagnosis_therapies",
        type: "textarea",
      },
    ],
    [
      {
        label:
          "Limitazioni attività/partecipazione a causa del problema principale",
        name: "activity_limitations",
        type: "textarea",
      },
      {
        label: "",
        name: "questionnaire_group",
        type: "group",
        direction: "col",
        children: [
          {
            label: "Questionario",
            name: "questionnaire",
            type: "input",
          },
          {
            label: "Punteggio",
            name: "score",
            type: "input",
          },
        ],
      },
    ],
    [
      {
        label: 'Che idea si è fatto/a riguardo al suo “problema principale”?',
        name: "patient_perception_main_problem",
        type: "textarea",
         
      }
    ]
  ]
