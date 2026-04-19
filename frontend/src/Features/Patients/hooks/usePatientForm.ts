import { useEffect, useState } from "react";
import { CreatePatientPayload } from "../Types/patients.type";

export const usePatientForm = (initialData: CreatePatientPayload) => {
  const defaultData: CreatePatientPayload = {
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    birth_date: "",
    gender: "Altro",
    occupation: "",
    sports_hobbies: "",
    marital_status: "",
    diagnosis: "",
  };

  const [data, setData] = useState<CreatePatientPayload>({
    ...defaultData,
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setData((prev) => ({ ...defaultData, ...initialData }));
    }
  }, [JSON.stringify(initialData)]);

  const handleChange = (
    eOrName: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | string,
    value?: any
  ) => {
    if (typeof eOrName === 'string') {
      setData((prev) => ({ ...prev, [eOrName]: value }));
    } else {
      setData((prev) => ({ ...prev, [eOrName.target.name]: eOrName.target.value }));
    }
  };

  const reset = () => setData(initialData);

  return {
    data,
    handleChange,
    reset,
    setData,
  };
};
