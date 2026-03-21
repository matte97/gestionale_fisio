import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePastHistoryPayload } from "../pastHistory.types";
import { createPastHistory } from "../pastHistory.services";

export function useCreatePastHistory(anamnesisId: number){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(payload: CreatePastHistoryPayload) => createPastHistory(anamnesisId,payload),
        onSuccess: (newPastHistory) => {
            queryClient.invalidateQueries({queryKey: ["pastHistory"]})
        }
    })
}