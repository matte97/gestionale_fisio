import { useCreatePatientPage } from "../Hooks/useCreatePatientPage";
import { PatientForm } from "./PatientForm";

export function CreatePatientPage() {
  const { form, isPending, handleSubmit } = useCreatePatientPage();

  return (
    <PatientForm
      data={form.data}
      onChange={form.handleChange}
      onSubmit={handleSubmit}
      isLoading={isPending}
      titolo="Crea paziente"
    />
  );
}
