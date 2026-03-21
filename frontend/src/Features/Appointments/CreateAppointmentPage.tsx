import { useNavigate } from "react-router-dom";
import { usePatientsList } from "../Patients/hooks/usePatientsList";
import { useTherapiesList } from "../Therapies/Hooks/useTherapiesList";
import { AppointmentFormData } from "./appointment.type";
import { AppointmentForm } from "./Components/AppointmentForm";
import { useAppointmentForm } from "./Hooks/useAppointmentForm";
import { useCreateAppointment } from "./Hooks/useCreateAppointment";
import { mapFormToCreatePayload } from "./Services/appointments.mapper";

export function CreateAppointmentPage() {
  const initialData: AppointmentFormData = {
    patient_id: 0,
    therapy_id: 0,
    date: "",
    start_hour: "",
    end_hour: "",
    status: "",
    notes: "",
  };

  const form = useAppointmentForm(initialData);
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateAppointment();

  const { data: patients } = usePatientsList({});
  const { data: therapies } = useTherapiesList();

  const patientsOptions =
    patients?.map((p) => ({
      value: String(p.patient_id),
      label: `${p.first_name} ${p.last_name}`,
    })) || [];

  const therapiesOptions =
    therapies?.map((t) => ({
      value: String(t.id),
      label: t.name,
    })) || [];

  const handleSubmit = () => {
    const payload = mapFormToCreatePayload(form.data);
    mutate(payload, {
      onSuccess: () => {
        navigate(`/pazienti/${form.data.patient_id}/record`)
      }
    });
  };

  return (
    <AppointmentForm
      data={form.data}
      onChange={form.handleChange}
      onSubmit={handleSubmit}
      patientsOptions={patientsOptions}
      therapiesOptions={therapiesOptions}
      isLoading={isPending}
      titolo="Crea appuntamento"
    />
  );
}
