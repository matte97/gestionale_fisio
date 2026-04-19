import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAppointmentById } from "../Services/appointments.service";
import { Appointment } from "../Types/appointment.type";

export const useAppointmentDetails = (id: number, patientId: number) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["appointment", id, patientId],
        queryFn: () => getAppointmentById(id, patientId),
        staleTime: 1000 * 60,
        initialData: () => {
            const appointmentList = queryClient.getQueryData<Appointment[]>(["appointments"]);
            return appointmentList?.find((a) => a.id === id);
        }
    });
};
