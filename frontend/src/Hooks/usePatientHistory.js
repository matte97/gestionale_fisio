import { useEffect, useState } from "react";
import axiosClient from "../Api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function usePatientHistory(anamnesisId, mode = "create") {
  const [patientHistory, setPatientHistory] = useState({
    anamnesis_id: anamnesisId || "",
    main_problem: "",
    patient_goals: "",
    onset: "",
    cause_of_onset: "",
    onset_date: "",
    symptomps_relationship: "",
    other_signs_symptomps: "",
    phisical_activity: "",
    sleep_quality: "",
    health_lifestyle_changes: "",
    diagnostic_tests: "",
    other_diagnosis_therapies: "",
  });

  const [patientHistorySymptoms, setPatientHistorySymptoms] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editingSymptom, setEditingSymptom] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔥 Carica i dati solo in modalità EDIT
  useEffect(() => {
    if (mode !== "edit" || !anamnesisId) return;

    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get(`/patient_history/${anamnesisId}`);

        const data = res.data.data;

        setPatientHistory(data);

        // Se i sintomi arrivano dal backend
        if (data.symptoms) {
          setPatientHistorySymptoms(data.symptoms);
        }
      } catch (err) {
        console.error("Errore nel caricamento:", err);
        setError("Errore nel caricamento della scheda.");
      }
    };

    fetchHistory();
  }, [anamnesisId, mode]);

  const handleChange = (e) => {
    setPatientHistory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "edit") {
        await axiosClient.put(`/patient_history/${anamnesisId}`, {
          ...patientHistory,
          symptoms: patientHistorySymptoms,
        });
      } else {
        await axiosClient.post(`/patient_history`, {
          ...patientHistory,
          symptoms: patientHistorySymptoms,
        });
        navigate(`/anamnesi/${anamnesisId}/remota`);
      }
    } catch (err) {
      console.log(err);
      setError("Errore durante il salvataggio.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    // dati
    patientHistory,
    patientHistorySymptoms,
    modal,
    modalEdit,
    editingSymptom,
    loading,
    error,

    // funzioni
    setPatientHistorySymptoms,
    setModal,
    setModalEdit,
    setEditingSymptom,
    handleChange,
    handleSubmit,
  };
}
