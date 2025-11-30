import { useEffect, useState } from "react";
import axiosClient from "../Api/axiosClient";

export default function usePatientHistory(patientId, mode = "create") {
    const [patientHistory, setPatientHistory] = useState({
        patient_id: patientId || '',
        main_problem: '',
        patient_goals: '',
        onset: '',
        cause_of_onset: '',
        onset_date: '',
        symptomps_relationship: '',
        other_signs_symptomps: '',
        phisical_activity: '',
        sleep_quality: '',
        health_lifestyle_changes: '',
        diagnostic_tests: '',
        other_diagnosis_therapies: ''
    });

    const [patientHistorySymptoms, setPatientHistorySymptoms] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [editingSymptom, setEditingSymptom] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 🔥 Carica i dati solo in modalità EDIT
    useEffect(() => {
        if (mode !== "edit" || !patientId) return;

        const fetchHistory = async () => {
            try {
                const res = await axiosClient.get(`/patient_history/${patientId}`);

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
    }, [patientId, mode]);

    // 🔥 Aggiorna i campi testo
    const handleChange = (e) => {
        setPatientHistory(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // 🔥 Salva o aggiorna
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (mode === "edit") {
                await axiosClient.put(`/patient_history/${patientId}`, {
                    ...patientHistory,
                    symptoms: patientHistorySymptoms,
                });
            } else {
                await axiosClient.post(`/patient_history`, {
                    ...patientHistory,
                    symptoms: patientHistorySymptoms,
                });
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