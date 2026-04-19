import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePastHistoryPayload } from "../Types/pastHistory.type";
import { createPastHistory } from "../Services/pastHistory.service";

export function useCreatePastHistory(anamnesisId: number){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(payload: CreatePastHistoryPayload) => createPastHistory(anamnesisId,payload),
        onSuccess: (newPastHistory) => {
            queryClient.invalidateQueries({queryKey: ["pastHistory"]})
        }
    })
}
