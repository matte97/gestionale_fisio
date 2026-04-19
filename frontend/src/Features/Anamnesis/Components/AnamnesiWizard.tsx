import { useEffect, useState } from "react";
import { CreatePastHistoryPayload } from "../../../Features/PastHistory/Types/pastHistory.type";
import { CreatePatientHistoryPayload } from "../../../Features/PatientHistory/Types/patientHistory.type";
import { CreateAnamnesisPayload } from "../Types/anamnesis.type";
import { CreateConditionAssessmentPayload } from "../../../Features/ConditionAssessment/Types/conditionAssessment.type";
import { CreatePhysicalExaminationPayload } from "../../../Features/PhysicalExaminations/Types/physicalExaminations.type";
import { CreatePhysicaltherapyDiagnosisPayload } from "../../../Features/PhysicalTherapyDiagnosis/Types/physicalTherapyDiagnosis.type";
import { MultiStepForm } from "../../../Shared/Components/MultiStepForm";
import { PhysicalTherapyDiagnosisFormLayout } from "../../../Features/PhysicalTherapyDiagnosis/Utils/PhysicalTherapyDiagnosisFormLayout";
import { PhysicalExaminationFormLayout } from "../../../Features/PhysicalExaminations/Utils/PhysicalExaminationFormLayout";
import { ConditionAssessmentsFormLayout } from "../../../Features/ConditionAssessment/Utils/conditionAssessmentFormLayout";
import { pastHistoryFormLayout } from "../../../Features/PastHistory/Utils/pastHistoryFormLayout";
import { patientHistoryFormLayout } from "../../../Features/PatientHistory/Utils/patientHistoryFormLayout";
import axiosClient from "../../../Api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

type FormDataMulti = {
  anamnesi: CreateAnamnesisPayload;
  patientHistory: CreatePatientHistoryPayload;
  pastHistory: CreatePastHistoryPayload;
  ConditionAssessment: CreateConditionAssessmentPayload;
  physicalExamination: CreatePhysicalExaminationPayload;
  physicalTherapyDiagnosis: CreatePhysicaltherapyDiagnosisPayload;
};

export function AnamnesisWizard() {
  const { patientId } = useParams<{ patientId: string }>();
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<FormDataMulti>({
    anamnesi: { patient_id: Number(patientId) } as CreateAnamnesisPayload,
    patientHistory: {} as CreatePatientHistoryPayload,
    pastHistory: {} as CreatePastHistoryPayload,
    ConditionAssessment: {} as CreateConditionAssessmentPayload,
    physicalExamination: {} as CreatePhysicalExaminationPayload,
    physicalTherapyDiagnosis: {} as CreatePhysicaltherapyDiagnosisPayload,
  });

  useEffect(() => {
    if (patientId) {
      updateData("anamnesi", { patient_id: Number(patientId) });
    }
  }, [patientId]);

  const updateData = <K extends keyof FormDataMulti>(
    key: K,
    data: Partial<FormDataMulti[K]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...data },
    }));
  };

  const MIN_STEP = 0;
  const MAX_STEP = 4;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => (prev < MAX_STEP ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > MIN_STEP ? prev - 1 : prev));

  const submitAll = async () => {
    setIsSubmitting(true);
    try {
      await axiosClient.post("/anamnesis", formData);
      alert("Anamnesi salvata con successo!");

      // Assumendo anamnesi.patient_id sia popolato:
      if (formData.anamnesi.patient_id) {
        navigate(`/pazienti/${formData.anamnesi.patient_id}/record`);
      } else {
        navigate(`/pazienti`);
      }
    } catch (error) {
      console.log(formData);
      console.error("Errore salvataggio anamnesi:", error);
      alert("Errore durante il salvataggio. Controlla la console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      data: formData.patientHistory,
      updateKey: "patientHistory",
      fields: patientHistoryFormLayout,
      titolo: "Anamnesi prossima",
    },
    {
      data: formData.pastHistory,
      updateKey: "pastHistory",
      fields: pastHistoryFormLayout,
      titolo: "Anamnesi remota",
    },
    {
      data: formData.ConditionAssessment,
      updateKey: "ConditionAssessment",
      fields: ConditionAssessmentsFormLayout,
      titolo: "Categorie di ragionamento clinico pre-esame fisico",
    },
    {
      data: formData.physicalExamination,
      updateKey: "physicalExamination",
      fields: PhysicalExaminationFormLayout,
      titolo: "Esame fisico",
    },
    {
      data: formData.physicalTherapyDiagnosis,
      updateKey: "physicalTherapyDiagnosis",
      fields: PhysicalTherapyDiagnosisFormLayout,
      titolo: "Diagnosi fisioterapica",
    },
  ];

  const currentStep = steps[step];

  return (
    <MultiStepForm
      data={currentStep.data}
      fields={currentStep.fields}
      titolo={currentStep.titolo}
      next={step === MAX_STEP ? submitAll : nextStep}
      prev={prevStep}
      onChange={(name, value) =>
        updateData(currentStep.updateKey as keyof FormDataMulti, { [name]: value })
      }
    />
  );
}
