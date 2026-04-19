import { useEffect, useState } from "react";
import {
  CreatePastHistoryPayload,
  UpdatePastHistoryPayload,
} from "../Types/pastHistory.type";

export const usePastHistoryForm = (
  initialData: CreatePastHistoryPayload,
) => {
  const defaultData: CreatePastHistoryPayload = {
    anamnesis_id: 0,
    other_medical_condition: "",
    similar_episodes_treatments_outcome: "",
    medication_use: "",
    physiological_history: "",
    family_history: "",
  };

  const [data, setData] = useState<CreatePastHistoryPayload>({
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
