import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAppointmentPayload } from "../appointment.type";
import { createAppointment } from "../Services/appointments.service";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) =>
      createAppointment(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
    },
  });
};
