import { useState } from "react";
import { CreateConditionAssessmentPayload } from "../Types/conditionAssessment.type";

export const usePatientHistoryForm = (
  initialData: CreateConditionAssessmentPayload,
) => {
  const [data, setData] = useState(initialData);

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
