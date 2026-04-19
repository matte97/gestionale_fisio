import { useEffect, useState } from "react";
import { CreatePatientHistoryPayload } from "../Types/patientHistory.type";

export const usePatientHistoryForm = (
  initialData: CreatePatientHistoryPayload,
) => {
  const defaultData: CreatePatientHistoryPayload = {
    main_problem: "",
    patient_goals: "",
    onset: "",
    cause_of_onset: "",
    onset_date: "",
    symptomps_relationship: [],
    other_signs_symptomps: "",
    phisical_activity: "",
    sleep_quality: "",
    health_lifestyle_changes: "",
    diagnostic_tests: "",
    other_diagnosis_therapies: "",
    activity_limitations: "",
    questionnaire: "",
    score: "",
    patient_perception_main_problem: "",
  };

  const [data, setData] = useState<CreatePatientHistoryPayload>({
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
