import { FieldConfig } from "../../../Shared/Types/field.types";

export const PhysicalTherapyDiagnosisFormLayout: FieldConfig[][] = [
  [{ type: "section", title: "Caratteristiche della condizione" }],
  [
    {
      label: "Possibili fonti",
      name: "possible_sources",
      type: "input",
    },
    {
      label: "Mecc./non",
      name: "mechanical_or_non_mechanical",
      type: "input",
    },
    {
      label: "Tipo di dolore",
      name: "pain_type",
      type: "input",
    },
    {
      label: "Meccanismo del dolore",
      name: "pain_mechanism",
      type: "input",
    },
  ],
  [
    {
      label: "S",
      name: "severity",
      type: "select",
      options: [
        { value: "high", label: "Alta" },
        { value: "middle", label: "Media" },
        { value: "low", label: "Bassa" },
      ],
    },
    {
      label: "I",
      name: "irritability",
      type: "select",
      options: [
        { value: "high", label: "Alta" },
        { value: "middle", label: "Media" },
        { value: "low", label: "Bassa" },
      ],
    },
    {
      label: "N",
      name: "nature",
      type: "select",
      options: [
        { value: "mechanical", label: "Meccanico" },
        { value: "neuropathic", label: "Neuropatico" },
        {
          value: "mechanical on neuropathic",
          label: "Meccanico su neuropatico",
        },
        { value: "other", label: "Altro" },
      ],
    },
    {
      label: "S",
      name: "stage",
      type: "select",
      options: [
        { value: "acute", label: "Acuto" },
        { value: "subacute", label: "Subacuto" },
        { value: "chronic", label: "Cronico" },
        { value: "acute on chronic", label: "Acuto su cronico" },
      ],
    },
    {
      label: "S",
      name: "stability",
      type: "select",
      options: [
        { value: "improving", label: "In miglioramento" },
        { value: "worsening", label: "In peggioramento" },
        { value: "no change", label: "Nessun cambiamento" },
        { value: "fluctuating", label: "Fluttuante" },
      ],
    },
  ],
  [
    {
      label: "Deficit mobilità",
      nameCheck: "mobility_deficit_present",
      nameText: "mobility_deficit_notes",
      type: "checkboxInput",
    },
    {
      label: "Deficit funzione neuromuscolare",
      nameCheck: "neuromuscular_deficit_present",
      nameText: "neuromuscular_deficit_notes",
      type: "checkboxInput",
    },
    {
      label: "Caricabilità locale",
      nameCheck: "local_load_capacity_present",
      nameText: "local_load_capacity_notes",
      type: "checkboxInput",
    },
  ],
  [
    {
      label: "Caricabilità globale",
      nameCheck: "global_load_capacity_present",
      nameText: "global_load_capacity_notes",
      type: "checkboxInput",
    },
    {
      label: "Meccano-sensitività tessuto neurale",
      nameCheck: "neural_mechanosensitivity_present",
      nameText: "neural_mechanosensitivity_notes",
      type: "checkboxInput",
    },
    {
      label: "Iperalgesia o allodinia",
      nameCheck: "hyperalgesia_or_allodynia_present",
      nameText: "hyperalgesia_or_allodynia_notes",
      type: "checkboxInput",
    },
  ],
  [{ type: "section", title: "Fattori constribuenti" }],
  [
    {
      label: "Biologici (salute generale, stile di vita, altri disturbi)",
      name: "biological_factors",
      type: "textarea",
    },
    {
      label: "Psicologici",
      name: "psychological_factors",
      type: "textarea",
    },
    {
      label: "Sociali",
      name: "social_factors",
      type: "textarea",
    },
  ],
  [{ type: "section", title: "Decisioni condivise" }],
  [
    {
      label: "Breve termine",
      name: "short_term_goals",
      type: "textarea",
    },
    {
      label: "Medio termine",
      name: "medium_term_goals",
      type: "textarea",
    },
    {
      label: "Lungo termine",
      name: "long_term_goals",
      type: "textarea",
    },
  ],
  [{ type: "section", title: "Piano di tratamento" }],
  [
    {
      label: "Controindicazioni",
      name: "controindications",
      type: "textarea",
    },
    {
      label: "Cautele",
      name: "precautions",
      type: "textarea",
    },
    {
      label: "Indicazioni",
      name: "indications",
      type: "textarea",
    },
  ],
  [
    {
      label: "Trattamento di prova",
      name: "test_treatment",
      type: "textarea",
    },
    {
      label: "Posologia",
      name: "treatment_dosage",
      type: "textarea",
    },
    {
      label: "Programma sedute",
      name: "session_schedule",
      type: "textarea",
    },
  ],
];
