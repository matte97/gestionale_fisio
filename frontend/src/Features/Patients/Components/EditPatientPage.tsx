import { useEditPatientPage } from "../Hooks/useEditPatientPage";
import { PatientForm } from "./PatientForm";

export function EditPatientPage() {
  const { patient, isLoading, form, isUpdating, handleSubmit } = useEditPatientPage();

  if (isLoading || !patient) return <div>Caricamento...</div>;

  return (
    <PatientForm
      data={form.data}
      onChange={form.handleChange}
      onSubmit={handleSubmit}
      isLoading={isUpdating}
      titolo="Modifica paziente"
    />
  );
}
