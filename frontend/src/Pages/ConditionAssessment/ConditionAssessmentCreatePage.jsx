import { useParams } from "react-router-dom";
import ActionButton from "../../Components/ActionButton";
import useConditionAssessmentForm from "../../Hooks/useConditionAssessmentForm";
import AnamnesisForm from "../../Components/AnamnesisForm";
import { conditionAssesmentsFormLayout } from "./conditionAssessmentFormLayout";

function ConditionAssessmentCreatePage() {
    const { idAnamnestica } = useParams();
    const {
        conditionAssessment,
        error,
        handleChange,
        handleSubmit
    } = useConditionAssessmentForm(idAnamnestica, "create");


    return (
        <>
            <div className="flex justify-center flex-col items-start p-2 w-full h-[90vh]">
                {/* HEADER STICKY */}
                <div className="w-full p-2 border-b bg-white sticky top-0 z-10">
                    <h2 className="text-2xl font-semibold text-center">
                        Categorie di ragionamento clinico pre-esame fisico
                    </h2>
                    {/*
                        {error && (
                            <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-600 rounded">
                                {error}
                            </div>
                        )}*/}

                </div>


                <AnamnesisForm
                    formLayout={conditionAssesmentsFormLayout(conditionAssessment)}
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
    )
}

export default ConditionAssessmentCreatePage;