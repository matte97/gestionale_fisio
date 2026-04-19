import { useNavigate } from "react-router-dom";
import { CreatePatientPayload } from "../Types/patients.type";
import { usePatientForm } from "./usePatientForm";
import { useCreatePatient } from "./UseCreatePatient";

export const useCreatePatientPage = () => {
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
  const { mutate, isPending } = useCreatePatient();

  const handleSubmit = () => {
    mutate(form.data, {
      onSuccess: () => {
        navigate('/pazienti');
      }
    });
  };

  return {
    form,
    isPending,
    handleSubmit,
  };
};
