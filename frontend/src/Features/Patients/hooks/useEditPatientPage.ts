import { useParams, useNavigate } from "react-router-dom";
import { usePatientDetails } from "./usePatientDetails";
import { useUpdatePatient } from "./useUpdatePatient";
import { usePatientForm } from "./usePatientForm";
import { useMemo } from "react";

export const useEditPatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const patientId = Number(id);
  const { data: patient, isLoading } = usePatientDetails(patientId);

  const { mutate, isPending } = useUpdatePatient();

  const initialData = useMemo(() => {
    if (!patient) return null;
    return {
      first_name: patient.first_name,
      last_name: patient.last_name,
      email: patient.email,
      address: patient.address,
      birth_date: patient.birth_date,
      phone: patient.phone || "",
      gender: patient.gender || "Altro",
      occupation: patient.occupation || "",
      sports_hobbies: patient.sports_hobbies || "",
      marital_status: patient.marital_status || "",
      diagnosis: patient.diagnosis || "",
    };
  }, [patient]);

  const form = usePatientForm(initialData as any);

  const handleSubmit = () => {
    if (!patient) return;
    mutate({ id: patient.patient_id!, payload: form.data }, {
      onSuccess: () => navigate("/pazienti"),
    });
  };

  return {
    patient,
    isLoading,
    form,
    isUpdating: isPending,
    handleSubmit,
  };
};
