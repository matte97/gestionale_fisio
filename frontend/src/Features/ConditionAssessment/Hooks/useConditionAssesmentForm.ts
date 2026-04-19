import { useEffect, useState } from "react";
import { CreateConditionAssessmentPayload } from "../Types/conditionAssessment.type";

export const useConditionAssesmentForm = (
  initialData: CreateConditionAssessmentPayload,
) => {
  const defaultData: CreateConditionAssessmentPayload = {
    possible_sources: "",
    mechanical_or_non_mechanical: "",
    pain_type: "",
    pain_mechanism: "",
    severity: "",
    irritability: "",
    nature: "",
    stage: "",
    stability: "",
    mobility_deficit_present: false,
    mobility_deficit_notes: "",
    neuromuscular_deficit_present: false,
    neuromuscular_deficit_notes: "",
    local_load_capacity_present: false,
    local_load_capacity_notes: "",
    global_load_capacity_present: false,
    global_load_capacity_notes: "",
    neural_mechanosensitivity_present: false,
    neural_mechanosensitivity_notes: "",
    hyperalgesia_or_allodynia_present: false,
    hyperalgesia_or_allodynia_notes: "",
    biological_factors: "",
    psychological_factors: "",
    social_factors: "",
    positive_prognostic_factors: "",
    negative_prognostic_factors: "",
    contraindications: "",
    precautions: "",
    indications: "",
  };

  const [data, setData] = useState<CreateConditionAssessmentPayload>({
    ...defaultData,
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setData((prev) => ({ ...defaultData, ...initialData }));
    }
  }, [JSON.stringify(initialData)]);

  const handleChange = (
    eOrName: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | string,
    value?: any
  ) => {
    if (typeof eOrName === 'string') {
      setData((prev) => ({ ...prev, [eOrName]: value }));
    } else {
      setData((prev) => ({ ...prev, [eOrName.target.name]: eOrName.target.value }));
    }
  };

  const reset = () => setData(initialData);

  return { data, handleChange, reset };
};
