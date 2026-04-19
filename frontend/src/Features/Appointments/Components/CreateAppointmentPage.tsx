import { useCreateAppointmentPage } from "../Hooks/useCreateAppointmentPage";
import { AppointmentForm } from "./AppointmentForm";

export function CreateAppointmentPage() {
  const { form, isPending, patientsOptions, therapiesOptions, handleSubmit } = useCreateAppointmentPage();

  return (
    <AppointmentForm
      data={form.data}
      onChange={form.handleChange}
      onSubmit={handleSubmit}
      patientsOptions={patientsOptions}
      therapiesOptions={therapiesOptions}
      isLoading={isPending}
      titolo="Crea appuntamento"
      disabled={false}
    />
  );
}
