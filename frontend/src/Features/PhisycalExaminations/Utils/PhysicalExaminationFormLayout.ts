import { FieldConfig } from "../../../Shared/Types/field.types";

export const PhysicalExaminationFormLayout: FieldConfig[][] = [
  [
    { label: "Sintomi di base", name: "baseline_symptoms", type: "textarea" },
    {
      label: "Correlazione sintomi posture",
      name: "symptom_postural_correlations",
      type: "boolean",
      alwaysShowChildren: true,
      children: [
        { label: "Locale", name: "local_correlation", type: "input" },
        { label: "Regionale", name: "regional_correlation", type: "input" },
        { label: "Globale", name: "global_correlation", type: "input" },
      ],
    },
  ],
  [
    { label: "Esame per red flag", name: "red_flag", type: "textarea" },
    {
      label: "Esame Neurologico",
      name: "neurological_exam_group",
      type: "group",
      children: [
        { label: "Funzione", name: "neurological_function", type: "textarea" },
        { label: "Meccano-sensitività", name: "mechanosensitivity", type: "textarea" },
      ],
    },
  ],
  [
    {
      label:
        "Dimostrazione posizioni, posture o movimenti provocativi/alleviativi (intensità)",
      name: "provocative_relieving_movements",
      type: "textarea",
    },
  ],
  [{ type: "section", title: "Movimenti" }],
  [
    {
      type: "table",
      name: "active_movements_region",
      label: "Movimenti Attivi Regionali",
      columns: [
        { label: "Movimento", name: "movement", type: "input" },
        { label: "QUANTITÀ/QUALITÀ", name: "range_quality", type: "input" },
        { label: "DOLORE (ev. end-feel)", name: "pain", type: "plusMinus", maxLength: 3 },
      ],
    },
    {
      type: "table",
      name: "passive_movements_region",
      label: "Movimenti Passivi Fisiologici",
      columns: [
        { label: "Movimento", name: "movement", type: "input" },
        { label: "QUANTITÀ/QUALITÀ", name: "range_quality", type: "input" },
        { label: "DOLORE (ev. end-feel)", name: "pain", type: "plusMinus", maxLength: 3 },
      ],
    },
  ],
  [
    {
      type: "table",
      name: "accessory_passive_movements_region",
      label: "Movimenti Passivi Accessori",
      columns: [
        { label: "Movimento", name: "movement", type: "input" },
        { label: "QUANTITÀ/QUALITÀ", name: "range_quality", type: "input" },
        { label: "DOLORE (ev. end-feel)", name: "pain", type: "plusMinus", maxLength: 3 },
      ],
    },
  ],
  [{ type: "section", title: "Esame della funzione neuromuscolare" }],
  [
    {
      label: "Forza",
      name: "neuromuscular_strength",
      type: "textarea",
    },
    {
      label: "Resistenza",
      name: "neuromuscular_endurance",
      type: "textarea",
    },
    {
      label: "Controllo",
      name: "neuromuscular_motor_control",
      type: "textarea",
    },
    {
      label: "Potenza",
      name: "neuromuscular_power",
      type: "textarea",
    },
  ],
  [{ label: "Test speciali", name: "special_test", type: "textarea" }],
];
