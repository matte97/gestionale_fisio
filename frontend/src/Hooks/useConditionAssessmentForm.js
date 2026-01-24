import { useEffect, useState } from "react";
import axiosClient from "../Api/axiosClient";

export default function useConditionAssessmentForm(anamnesisId, mode = create) {
  const [conditionAssessment, setConditionAssessment] = useState({
    anamnesis_id: anamnesisId || "",
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
  });

  const [error, setError] = useState("");

  /*Carico i dati solo se sono i modalità edit*/
  useEffect(() => {
    if (mode !== "edit" || !anamnesisId) return;

    const fetchConsitionAssessment = async () => {
      try {
        const res = await axiosClient.get(
          `/condition_assessments/${anamnesisId}`
        );
        const data = res.data.data;
        setConditionAssessment(data);
      } catch (err) {
        setError(error);
      }
    };

    fetchConsitionAssessment();
  }, [anamnesisId, mode]);

  /*Funzione per cambiare lo stato dei campi*/
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setConditionAssessment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /*Funzione per salvare o aggiornare*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "edit") {
        await axiosClient.put(`/condition_assessments/${anamnesisId}`, {
          ...conditionAssessment,
        });
      } else {
        console.log("entro qui?");
        await axiosClient.post(`/condition_assessments`, {
          ...conditionAssessment,
        });
      }
    } catch (err) {
      setError(err);
    }
  };

  return {
    conditionAssessment,
    error,

    handleSubmit,
    handleChange,
  };
}
