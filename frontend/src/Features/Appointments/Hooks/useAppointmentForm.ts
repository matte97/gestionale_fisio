import { useState } from "react";
import { AppointmentFormData, CreateAppointmentPayload } from "../Types/appointment.type";
import { mapFormToCreatePayload } from "../Services/appointments.mapper";

export const useAppointmentForm = (initialData: AppointmentFormData) => {
  const [data, setData] = useState<AppointmentFormData>(initialData);

  const handleChange = (
    eOrName: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | string,
    value?: any
  ) => {
    if (typeof eOrName === 'string') {
      setData(prev => ({ ...prev, [eOrName]: value }));
    } else {
      setData(prev => ({ ...prev, [eOrName.target.name]: eOrName.target.value }));
    }
  };

  const reset = () => setData(initialData);

  const getPayload = (): CreateAppointmentPayload => mapFormToCreatePayload(data);

  return {
    data,
    handleChange,
    reset,
    setData,
    getPayload,
  };
};
