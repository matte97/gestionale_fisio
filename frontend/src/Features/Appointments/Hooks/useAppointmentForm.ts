import { useEffect, useState } from "react";
import { AppointmentFormData, CreateAppointmentPayload } from "../Types/appointment.type";
import { mapFormToCreatePayload } from "../Services/appointments.mapper";

export const useAppointmentForm = (initialData: AppointmentFormData) => {
  const defaultData: AppointmentFormData = {
    patient_id: 0,
    therapy_id: 0,
    date: "",
    start_hour: "",
    end_hour: "",
    status: "scheduled",
    notes: "",
  };

  const [data, setData] = useState<AppointmentFormData>({
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
