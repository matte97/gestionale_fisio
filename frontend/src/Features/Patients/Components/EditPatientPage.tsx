import { useParams, useNavigate } from "react-router-dom";
import { usePatientDetails } from "../Hooks/usePatientDetails";
import { useUpdatePatient } from "../Hooks/useUpdatePatient";
import { usePatientForm } from "../Hooks/usePatientForm";
import { PatientForm } from "./PatientForm";

export function EditPatientPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: patient, isLoading } = usePatientDetails(Number(id));

  const { mutate} = useUpdatePatient();

  const form = usePatientForm({
    first_name: patient?.first_name,
    last_name: patient?.last_name,
    email: patient?.email,
    address: patient?.address,
    birth_date: patient?.birth_date,
    phone: patient?.phone || "",
    gender: patient?.gender || "Altro",
    occupation: patient?.occupation || "",
    sports_hobbies: patient?.sports_hobbies || "",
    marital_status: patient?.marital_status || "",
    diagnosis: patient?.diagnosis || "",
  });

  const handleSubmit = () => {
    mutate({ id: patient.patient_id!, payload: form.data }, {
      onSuccess: () => navigate("/pazienti"),
    });
  };

  return (
    <PatientForm
      data={form.data}
      onChange={form.handleChange}
      onSubmit={handleSubmit}
      titolo="Modifica paziente"
    />
  );
}
