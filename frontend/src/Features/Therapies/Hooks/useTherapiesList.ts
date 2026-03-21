import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getTherapies } from "../therapies.services";
import { Therapie } from "../therapies.type";

export const useTherapiesList = () => {
    const options: UseQueryOptions<Therapie[], Error> = {
        queryKey: ["therapies"],
        queryFn: () => getTherapies(),
    };

    return useQuery(options);
}