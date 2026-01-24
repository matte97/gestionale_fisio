import { useState } from "react";
import TextArea from "../../Components/TextArea";
import ActionButton from "../../Components/ActionButton";
import axiosClient from "../../Api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { pastHistoryFormLayout } from "./pastHistoryFormLayout";
import AnamnesisForm from "../../Components/AnamnesisForm";

function InsertPastHistory() {
  const { idAnamnestica } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [pastHistory, setPastHistory] = useState({
    anamnesis_id: idAnamnestica || "",
    other_medical_conditions: "",
    similar_episodes_treatments_outcome: "",
    medication_use: "",
    physiological_history: "",
    family_history: "",
  });

  const handleChange = (e) => {
    setPastHistory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pastHistory);
    try {
      await axiosClient.post("/past_history", pastHistory);
      navigate(`/anamnesi/${idAnamnestica}/valutazione`)
    } catch (err) {
      setError("Errore durante il salvataggio.");
    }
  };

  return (
    <>
      <div className="flex justify-center flex-col items-start p-2 w-full h-[90vh]">
        {/* HEADER STICKY */}
        <div className="w-full p-2 border-b bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-center">
            Anamnesi remota
          </h2>
          {/*
                        {error && (
                            <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-600 rounded">
                                {error}
                            </div>
                        )}*/}
        </div>

        <AnamnesisForm
          formLayout={pastHistoryFormLayout(pastHistory)}
          handleChange={handleChange}
        />

        {/* FOOTER STICKY */}
        <div className="w-full p-2 bg-white sticky top-0 z-10">
          <div className="w-full flex justify-end">
            <ActionButton
              type={"submit"}
              label={"Salva"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default InsertPastHistory;
