import { useParams, useNavigate } from "react-router-dom";
import { usePatientsList } from "../../Patients/Hooks/usePatientsList";
import { useTherapiesList } from "../../Therapies/Hooks/useTherapiesList";
import { useAppointmentForm } from "./useAppointmentForm";
import { useUpdateAppointment } from "./useUpdateAppointment";
import {
  mapAppointmentToForm,
  mapFormToUpdatePayload,
} from "../Services/appointments.mapper";
import { useMemo } from "react";
import { useAppointmentDetails } from "./useAppointmentDetail";

export const useEditAppointmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const appointmentId = Number(id);

  const patientId = Number(
    new URLSearchParams(window.location.search).get("patient_id"),
  );
  
  const { data: appointment, isLoading } = useAppointmentDetails(
    appointmentId,
    patientId,
  );

  const { mutate, isPending } = useUpdateAppointment();

  const initialData = useMemo(() => {
    if (appointment) {
      return mapAppointmentToForm(appointment);
    }
    return {
      patient_id: 0,
      therapy_id: 0,
      date: "",
      start_hour: "",
      end_hour: "",
      status: "",
      notes: "",
    };
  }, [appointment]);

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
    const payload = mapFormToUpdatePayload(form.data);

    mutate(
      {
        id: appointmentId,
        payload,
      },
      {
        onSuccess: () => {
          navigate(`/pazienti/${form.data.patient_id}/record`);
        },
      },
    );
  };

  return {
    appointment,
    isLoading,
    form,
    isUpdating: isPending,
    patientsOptions,
    therapiesOptions,
    handleSubmit,
  };
};
