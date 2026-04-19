import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getAppointments } from "../Services/appointments.service";
import { Appointment } from "../Types/appointment.type";

export const useAppointmentsList = () => {
  const options: UseQueryOptions<Appointment[], Error> = {
    queryKey: ["appointments"],
    queryFn: () => getAppointments(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  };

  return useQuery(options);
};
