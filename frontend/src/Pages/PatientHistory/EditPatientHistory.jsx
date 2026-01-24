import { useNavigate, useParams } from "react-router-dom";
import EditSymptoms from "./EditSymptoms";
import InsertSymptoms from "./InsertSymptoms";
import usePatientHistory from "../../Hooks/usePatientHistory";
import SymptomsButtons from "../../Components/PatientHistory/SymptomsButton";
import AnamnesisForm from "../../Components/AnamnesisForm";
import { patientHistoryFormLayout } from "./patientHistoryFormLayout";
import ActionButton from "../../Components/ActionButton";

function EditPatientHistory() {
    const { idAnamnestica } = useParams();
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
    } = usePatientHistory(Number(idAnamnestica), "edit");

    const goToPastHistory = (e) => {
        e.preventDefault();
        navigate(`/patients/${id}/past_history`)
    };

    return (
    <>
      <div className="flex justify-center flex-col items-start p-2 w-full h-[90vh]">
        {/* HEADER STICKY */}
        <div className="w-full p-2 border-b bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-center">
            Anamnesi Prossima
          </h2>
          {/*
                        {error && (
                            <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-600 rounded">
                                {error}
                            </div>
                        )}*/}
        </div>

        <AnamnesisForm
          formLayout={patientHistoryFormLayout(patientHistory)}
          handleChange={handleChange}
        />

        

        {/* FOOTER STICKY */}
        <div className="w-full p-2 bg-white sticky top-0 z-10">
          <div className="w-full flex justify-end">
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
                        </div>

                        {modal &&
                            <InsertSymptoms
                                modal={modal}
                                setModal={setModal}
                                patientHistorySymptoms={patientHistorySymptoms}
                                setPatientHistorySymptoms={setPatientHistorySymptoms}
                            />}
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

export default EditPatientHistory;