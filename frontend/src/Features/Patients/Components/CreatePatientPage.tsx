import { useNavigate } from "react-router-dom";
import { PatientForm } from "./PatientForm";
import { CreatePatientPayload } from "../Types/patients.type";
import { usePatientForm } from "../Hooks/usePatientForm";
import { useCreatePatient } from "../Hooks/UseCreatePatient";

export function CreatePatientPage() {
  const navigate = useNavigate();

  const initialData: CreatePatientPayload = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    birth_date: "",
    phone: "",
    gender: "Altro",
    occupation: "",
    sports_hobbies: "",
    marital_status: "",
    diagnosis: "",
  };

  const form = usePatientForm(initialData);
  const {mutate} = useCreatePatient();

  const handlesubmit = () => {
    mutate(form.data, {
      onSuccess: () => {
        navigate('/pazienti')
      }
    })
  }
  return (
    <>
      <PatientForm
        data={form.data}
        onChange={form.handleChange}
        onSubmit={handlesubmit}
        titolo="Crea paziente"
      />
    </>
  );
}
