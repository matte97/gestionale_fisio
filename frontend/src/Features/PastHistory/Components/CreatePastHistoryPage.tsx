import { useNavigate, useParams } from "react-router-dom"
import { CreatePastHistoryPayload } from "../Types/pastHistory.type";
import { usePastHistoryForm } from "../Hooks/usePastHistoryForm";
import PastHIstoryForm from "./PastHistoryForm";
import { useCreatePastHistory } from "../Hooks/useCreatePastHistory";

export function CreatePastHistoryPage(){
    const navigate = useNavigate();
    const { anamnesisId } = useParams<{ anamnesisId: string }>();
    const initialData:CreatePastHistoryPayload = {
        anamnesis_id: 0,
        family_history: '',
        medication_use: '',
        other_medical_condition:'',
        physiological_history:'',
        similar_episodes_treatments_outcome:''
    }

    const form = usePastHistoryForm(initialData);

    const {mutate} = useCreatePastHistory(Number(anamnesisId));
    const handleSubmit = () => {
        mutate(form.data, {
            onSuccess: () => {
                navigate(`/anamnesi/${anamnesisId}/valutazione`)
            }
        })
    }
    return(
        <PastHIstoryForm
        data={form.data}
        onChange={form.handleChange}
        onSubmit={handleSubmit}
        titolo="Anamnesi remota"
        />
    )
}
