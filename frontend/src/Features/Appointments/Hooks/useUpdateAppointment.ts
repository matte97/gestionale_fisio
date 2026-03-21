import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateAppointmentPayload } from "../appointment.type";
import { updateAppointment } from "../Services/appointments.service";

export const useUpdateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number,
            payload: UpdateAppointmentPayload;    
        }) => updateAppointment(id,payload),

        onSuccess: (updatedAppointment) => {
            queryClient.setQueryData(
                ["appointment", updatedAppointment.id],
                updatedAppointment
            );

            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        }
    })
}