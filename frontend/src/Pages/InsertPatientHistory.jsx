import { useNavigate, useParams } from "react-router-dom";
import InsertSymptoms from "./InsertSymptoms";
import EditSymptoms from "./EditSymptoms";
import TextArea from "../Components/TextArea";
import usePatientHistory from "../Hooks/usePatientHistory";
import SymptomsButtons from "../Components/PatientHistory/SymptomsButton";
import RadioGroup from "../Components/PatientHistory/RadioGroup";
import ActionButton from "../Components/ActionButton";

function InsertPatientHistory() {
    const { id } = useParams();

    const navigate = useNavigate();

    const {
        patientHistory,
        patientHistorySymptoms,
        modal,
        modalEdit,
        editingSymptom,
        loading,
        error,
        setModal,
        setModalEdit,
        setEditingSymptom,
        setPatientHistorySymptoms,
        handleChange,
        handleSubmit,
    } = usePatientHistory(Number(id), "create");

    return (
        <>
            <div className="flex justify-center items-start p-2 w-full">
                <form
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                            e.preventDefault();
                        }
                    }}
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full bg-white rounded-lg shadow h-full"
                >
                    {/* HEADER STICKY */}
                    <div className="p-2 border-b bg-white sticky top-0 z-10">
                        <h2 className="text-2xl font-semibold text-center">
                            Anamnesi prossima
                        </h2>

                        {error && (
                            <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-600 rounded">
                                {error}
                            </div>
                        )}

                    </div>

                    <div className="w-full flex gap-3 p-1">
                        <TextArea
                            label="Problema principale"
                            name="main_problem"
                            value={patientHistory.main_problem}
                            onChange={handleChange}
                            rows={2}
                        />
                        <TextArea
                            label="Obbiettivi del paziente"
                            name="patient_goals"
                            value={patientHistory.patient_goals}
                            onChange={handleChange}
                            rows={2}
                        />
                    </div>

                    <div className="w-full flex gap-3 p-1">

                        {/* PROBLEMA PRINCIPALE */}
                        <RadioGroup
                            label="Problema principale"
                            name="onset"
                            value={patientHistory.onset}
                            onChange={handleChange}
                            options={[
                                { value: "traumatic", label: "Traumatico" },
                                { value: "insidious", label: "Insidioso" }
                            ]}
                        />

                        {/* CAUSA */}
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Causa</label>
                            <input
                                name="cause_of_onset"
                                value={patientHistory.cause_of_onset}
                                onChange={handleChange}
                                type="text"
                                className="w-full border p-2 rounded resize-none"
                            ></input>
                        </div>

                        {/* DATA */}
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Data</label>
                            <input
                                name="onset_date"
                                value={patientHistory.onset_date}
                                onChange={handleChange}
                                type="date"
                                className="w-full border p-2 rounded"
                            />
                        </div>

                    </div>

                    <div className="w-full flex gap-3 p-1">
                        <SymptomsButtons
                            symptoms={patientHistorySymptoms}
                            setEditingSymptom={setEditingSymptom}
                            setModalEdit={setModalEdit}
                        />

                        {modalEdit &&
                            <EditSymptoms
                                modalEdit={modalEdit}
                                setModalEdit={setModalEdit}
                                patientHistorySymptoms={patientHistorySymptoms}
                                setPatientHistorySymptoms={setPatientHistorySymptoms}
                                editingSymptom={editingSymptom}
                                setEditingSymptom={setEditingSymptom}
                            />
                        }

                        <div className="flex-1 flex justify-center items-center">
                            <button
                                type="button"
                                className="bg-green-500 text-white px-1 py-1 rounded"
                                onClick={() => setModal(true)}
                            >
                                Aggiungi sintomi
                            </button>
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1"></label>
                        </div>
                    </div>

                    {modal &&
                        <InsertSymptoms
                            modal={modal}
                            setModal={setModal}
                            patientHistorySymptoms={patientHistorySymptoms}
                            setPatientHistorySymptoms={setPatientHistorySymptoms}
                        />}

                    <div className="w-full flex gap-3 p-1">
                        <TextArea
                            label="Relazione tra i sintomi"
                            name="symptomps_relationship"
                            value={patientHistory.symptomps_relationship}
                            onChange={handleChange}
                            rows={2}
                        />
                        <TextArea
                            label="Altri segni e sintomi MS o non MS"
                            name="other_signs_symptomps"
                            value={patientHistory.other_signs_symptomps}
                            onChange={handleChange}
                            rows={2}
                        />
                        <TextArea
                            label="Attività fisica"
                            name="phisical_activity"
                            value={patientHistory.phisical_activity}
                            onChange={handleChange}
                            rows={2}
                        />
                    </div>

                    <div className="w-full flex gap-3 p-1">
                        <TextArea
                            label="Qualità del sonno"
                            name="sleep_quality"
                            value={patientHistory.sleep_quality}
                            onChange={handleChange}
                            rows={2}
                        />
                        <TextArea
                            label="Altre modificazioni salute (es. peso) o stile di vita"
                            name="health_lifestyle_changes"
                            value={patientHistory.health_lifestyle_changes}
                            onChange={handleChange}
                            rows={2}
                        />
                        <TextArea
                            label="Diagnostica strumentale/laboratorio"
                            name="diagnostic_tests"
                            value={patientHistory.diagnostic_tests}
                            onChange={handleChange}
                            rows={2}
                        />
                    </div>

                    <div className="w-full flex gap-3 p-1">
                        <TextArea
                            label="Altre diagnosi/terapie e loro esito"
                            name="other_diagnosis_therapies"
                            value={patientHistory.other_diagnosis_therapies}
                            onChange={handleChange}
                            rows={2}
                        />
                        <div className="flex-1">
                        </div>
                        <div className="flex-1 flex justify-end items-end">
                            <ActionButton
                            type={"submit"}
                            label={"Salva"}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default InsertPatientHistory;