import { useEditAppointmentPage } from "../Hooks/useEditAppointmentPage";
import { AppointmentForm } from "./AppointmentForm";

export function EditAppointmentPage() {
  const { 
    appointment, 
    isLoading, 
    form, 
    isUpdating, 
    patientsOptions, 
    therapiesOptions, 
    handleSubmit 
  } = useEditAppointmentPage();

  if (isLoading || !appointment) return <div>Caricamento...</div>;

  return (
    <AppointmentForm
      data={form.data}
      onChange={form.handleChange}
      onSubmit={handleSubmit}
      patientsOptions={patientsOptions}
      therapiesOptions={therapiesOptions}
      isLoading={isUpdating}
      titolo="Modifica appuntamento"
      disabled={true}
    />
  );
}
