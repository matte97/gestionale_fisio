import { useParams, useNavigate } from "react-router-dom";
import { usePatientsList } from "../../Patients/Hooks/usePatientsList";
import { useTherapiesList } from "../../Therapies/Hooks/useTherapiesList";
import { AppointmentForm } from "./AppointmentForm";
import { useAppointmentForm } from "../Hooks/useAppointmentForm";
import { useUpdateAppointment } from "../Hooks/useUpdateAppointment";
import {
  mapAppointmentToForm,
  mapFormToUpdatePayload,
} from "../Services/appointments.mapper";
import { useEffect } from "react";
import { useAppointmentDetails } from "../Hooks/useAppointmentDetail";

export function EditAppointmentPage() {
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

  const form = useAppointmentForm({
    patient_id: 0,
    therapy_id: 0,
    date: "",
    start_hour: "",
    end_hour: "",
    status: "",
    notes: "",
  });

  const { mutate, isPending } = useUpdateAppointment();

  const { data: patients } = usePatientsList(1, {});
  const { data: therapies } = useTherapiesList();

  useEffect(() => {
    if (appointment) {
      form.setData(mapAppointmentToForm(appointment));
    }
  }, [appointment]);

  const patientsOptions =
    patients?.data?.map((p) => ({
      value: String(p.patient_id),
      label: `${p.first_name} ${p.last_name}`,
    })) || [];

  const therapiesOptions =
    therapies?.map((t) => ({
      value: String(t.id),
      label: t.name,
    })) || [];

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

  if (isLoading || !appointment) return <div>Loading...</div>;

  return (
    <AppointmentForm
      data={form.data}
      onChange={form.handleChange}
      onSubmit={handleSubmit}
      patientsOptions={patientsOptions}
      therapiesOptions={therapiesOptions}
      isLoading={isPending}
      titolo="Modifica appuntamento"
      disabled={true}
    />
  );
}
