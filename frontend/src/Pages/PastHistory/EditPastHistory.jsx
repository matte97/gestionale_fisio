import { useEffect, useState } from "react";
import axiosClient from "../../Api/axiosClient";
import { useParams } from "react-router-dom";
import TextArea from "../../Components/TextArea";

function EditPastHistory() {

    const {id} = useParams();
    cons [error,setError] = useState("");

    const [pastHistory, setPastHistory] = useState({
            patient_id: id || "",
            other_medical_conditions: "",
            similar_episodes_treatments_outcome: "",
            medication_use: "",
            physiological_history: "",
            family_history: ""
        });

    useEffect(() => {
        const getPastHistory = async () => {
            try{
                const res = await axiosClient.get(`/past_history/${id}`);
                setPastHistory(res.data.data);
            }catch(err){
                console.log(err);
                setError("Errore nel caricamento dei dati");
            }
        }

        getPastHistory();
    },[id])

    return (
        <>
            <div className="flex justify-center items-start p-1 w-full">
                <form 
                className="flex flex-col w-full bg-white rounded-lg shadow h-full p-4" 
                onSubmit={handleSubmit}
                >
                    <div className="p-2 border-b bg-white sticky top-0 z-10">
                        <h2 className="text-2xl font-semibold text-center">
                            Anamnesi remota
                        </h2>
                    </div>

                    <div className="w-full flex gap-3 p-1">
                        <TextArea
                            label={"Patologie di altra natura"}
                            name="other_medical_conditions"
                            value={pastHistory.other_medical_conditions}
                            onChange={handleChange}
                            rows={3}
                        />
                        <TextArea
                            label={"Episodi simili, terapie ed esito"}
                            name="similar_episodes_treatments_outcome"
                            value={pastHistory.similar_episodes_treatments_outcome}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>

                    <div className="w-full flex gap-3 p-1">
                        <TextArea
                            label={"Uso di farmaci"}
                            name="medication_use"
                            value={pastHistory.medication_use}
                            onChange={handleChange}
                            rows={3}
                        />
                        <TextArea
                            label={"Anamnesi fisiologica (ciclo mestruale,gravidanze, stile di vita, BMI…)"}
                            name="physiological_history"
                            value={pastHistory.physiological_history}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>

                    <div className="w-full flex gap-3 p-1">
                        <TextArea
                            label={"Anamnesi familiare"}
                            name="family_history"
                            value={pastHistory.family_history}
                            onChange={handleChange}
                            rows={3}
                        />
                        <div className="flex-1 p-1 relative">
                            <div className="absolute bottom-1 right-1">
                                <ActionButton
                                    type={"submit"}
                                    label={"Salva"}
                                />
                            </div>
                        </div>
                    </div>

                </form >
            </div >
        </>
    )
}

export default EditPastHistory;