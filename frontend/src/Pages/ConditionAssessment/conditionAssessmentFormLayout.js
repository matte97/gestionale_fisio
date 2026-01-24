export const conditionAssesmentsFormLayout = (conditionAssessment) => [
  [{ type: "section", title: "Caratteristiche della condizione" }],
  [
    {
      label: "Possibili fonti",
      name: "possible_sources",
      value: conditionAssessment.possible_sources,
      type: "text",
    },
    {
      label: "Mecc./non",
      name: "mechanical_or_non_mechanical",
      value: conditionAssessment.mechanical_or_non_mechanical,
      type: "text",
    },
    {
      label: "Tipo di dolore",
      name: "pain_type",
      value: conditionAssessment.pain_type,
      type: "text",
    },
    {
      label: "Meccanismo del dolore",
      name: "pain_mechanism",
      value: conditionAssessment.pain_mechanism,
      type: "text",
    },
  ],
  [
    {
      label: "S",
      name: "severity",
      value: conditionAssessment.severity ,
      type: "select",
      options: [
                { value: "high", label: "Alta" },
                { value: "middle", label: "Media" },
                { value: "low", label: "Bassa" },
              ]
    },
    {
      label: "I",
      name: "irritability",
      value: conditionAssessment.irritability ,
      type: "select",
      options: [
                { value: "high", label: "Alta" },
                { value: "middle", label: "Media" },
                { value: "low", label: "Bassa" },
              ]
    },
    {
      label: "N",
      name: "nature",
      value: conditionAssessment.nature,
      type: "select",
      options: [
                { value: "mechanical", label: "Meccanico" },
                { value: "neuropathic", label: "Neuropatico" },
                { value: "mechanical on neuropathic", label: "Meccanico su neuropatico" },
                { value: "other", label: "Altro" },
              ]
    },
    {
      label: "S",
      name: "stage",
      value: conditionAssessment.stage ,
      type: "select",
      options: [
                { value: "acute", label: "Acuto" },
                { value: "subacute", label: "Subacuto" },
                { value: "chronic", label: "Cronico" },
                { value: "acute on chronic", label: "Acuto su cronico" },
              ]
    },
    {
      label: "S",
      name: "stability",
      value: conditionAssessment.stability ,
      type: "select",
      options: [
                { value: "improving", label: "In miglioramento" },
                { value: "worsening", label: "In peggioramento" },
                { value: "no change", label: "Nessun cambiamento" },
                { value: "fluctuating", label: "Fluttuante" },
              ]
    },
  ],
  [
    {
      label: "Deficit mobilità",
      nameCheck: "mobility_deficit_present",
      nameText: "mobility_deficit_notes",
      valueCheck: conditionAssessment.mobility_deficit_present,
      valueText: conditionAssessment.mobility_deficit_notes,
      type: "checkboxInput",
    },
    {
      label: "Deficit funzione neuromuscolare",
      nameCheck: "neuromuscular_deficit_present",
      nameText: "neuromuscular_deficit_notes",
      valueCheck: conditionAssessment.neuromuscular_deficit_present,
      valueText: conditionAssessment.neuromuscular_deficit_notes,
      type: "checkboxInput",
    },
    {
      label: "Caricabilità locale",
      nameCheck: "local_load_capacity_present",
      nameText: "local_load_capacity_notes",
      valueCheck: conditionAssessment.local_load_capacity_present,
      valueText: conditionAssessment.local_load_capacity_notes,
      type: "checkboxInput",
    },
  ],
  [
    {
      label: "Caricabilità globale",
      nameCheck: "global_load_capacity_present",
      nameText: "global_load_capacity_notes",
      valueCheck: conditionAssessment.global_load_capacity_present,
      valueText: conditionAssessment.global_load_capacity_notes,
      type: "checkboxInput",
    },
    {
      label: "Meccano-sensitività tessuto neurale",
      nameCheck: "neural_mechanosensitivity_present",
      nameText: "neural_mechanosensitivity_notes",
      valueCheck: conditionAssessment.neural_mechanosensitivity_present,
      valueText: conditionAssessment.neural_mechanosensitivity_notes,
      type: "checkboxInput",
    },
    {
      label: "Iperalgesia o allodinia",
      nameCheck: "hyperalgesia_or_allodynia_present",
      nameText: "hyperalgesia_or_allodynia_notes",
      valueCheck: conditionAssessment.hyperalgesia_or_allodynia_present,
      valueText: conditionAssessment.hyperalgesia_or_allodynia_notes,
      type: "checkboxInput",
    },
  ],
  [{ type: "section", title: "Fattori contribuenti" }],
  [
    {
      label: "Biologici (salute generale, stile di vita,altri disturbi)",
      name: "biological_factors",
      value: conditionAssessment.biological_factors,
      type: "textarea",
      rows: 2,
    },
    {
      label: "Psicologici",
      name: "psychological_factors",
      value: conditionAssessment.psychological_factors,
      type: "textarea",
      rows: 2,
    },
  ],
  [
    {
      label: "Sociali",
      name: "social_factors",
      value: conditionAssessment.social_factors,
      type: "textarea",
      rows: 2,
    },
  ],
  [{ type: "section", title: "Prognosi" }],
  [
    {
      label: "Fattori prognostici positivi",
      name: "positive_prognostic_factors",
      value: conditionAssessment.positive_prognostic_factors,
      type: "textarea",
      rows: 2,
    },
    {
      label: "Fattori prognostici negativi",
      name: "negative_prognostic_factors",
      value: conditionAssessment.negative_prognostic_factors,
      type: "textarea",
      rows: 2,
    },
  ],
  [{ type: "section", title: "Decisioni condivise" }],
  [
    {
      label: "Controindicazioni",
      name: "contraindications",
      value: conditionAssessment.contraindications,
      type: "textarea",
      rows: 2,
    },
    {
      label: "Cautele",
      name: "precautions",
      value: conditionAssessment.precautions,
      type: "textarea",
      rows: 2,
    },
  ],
  [
    {
      label: "Indicazioni",
      name: "indications",
      value: conditionAssessment.indications,
      type: "textarea",
      rows: 2,
    },
  ],
];
