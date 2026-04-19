import { useNavigate } from "react-router-dom";
import { usePatientsList } from "../../Patients/Hooks/usePatientsList";
import { useTherapiesList } from "../../Therapies/Hooks/useTherapiesList";
import { AppointmentFormData } from "../Types/appointment.type";
import { useAppointmentForm } from "./useAppointmentForm";
import { useCreateAppointment } from "./useCreateAppointment";
import { mapFormToCreatePayload } from "../Services/appointments.mapper";
import { useMemo } from "react";

export const useCreateAppointmentPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateAppointment();

  const initialData: AppointmentFormData = {
    patient_id: 0,
    therapy_id: 0,
    date: "",
    start_hour: "",
    end_hour: "",
    status: "scheduled",
    notes: "",
  };

  const form = useAppointmentForm(initialData);

  const { data: patients } = usePatientsList(1, {});
  const { data: therapies } = useTherapiesList();

  const patientsOptions = useMemo(() => 
    patients?.data?.map((p) => ({
      value: String(p.patient_id),
      label: `${p.first_name} ${p.last_name}`,
    })) || [], [patients]);

  const therapiesOptions = useMemo(() => 
    therapies?.map((t) => ({
      value: String(t.id),
      label: t.name,
    })) || [], [therapies]);

  const handleSubmit = () => {
    const payload = mapFormToCreatePayload(form.data);
    mutate(payload, {
      onSuccess: () => {
        navigate(`/pazienti/${form.data.patient_id}/record`);
      }
    });
  };

  return {
    form,
    isPending,
    patientsOptions,
    therapiesOptions,
    handleSubmit,
  };
};
